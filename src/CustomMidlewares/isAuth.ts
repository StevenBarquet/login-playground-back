/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// --------------------------------------IMPORTS------------------------------------
// Dependencies
import {Request, Response, NextFunction} from 'express';
const debug = require('debug')('app:others');
import {verify, sign} from 'jsonwebtoken';
// Others
import {TOKEN_NAME, TOKEN_SECRET} from '../configuration/globalData'

function isAuth(req: Request, res: Response, next: NextFunction){
  const {cookie} = req.headers
  validateCookie(cookie, res, next)
}

function validateCookie(reqCookie: string | undefined, res: Response, next: NextFunction){
  if (!reqCookie){
    debug('Missing cookie');
    res.send({status: 'bad-credentials'})
  } else {
    const {authToken, reqTokenName} = getCookieData(reqCookie);
    if (isInvalidTokenName(reqTokenName)){
      debug('Invalid token name');
      res.send({status: 'bad-credentials'})
    }

    const token = isValidToken(authToken)

    if (!token){
      debug('Invalid token');
      res.send({status: 'bad-credentials'})
    } else {
      debug('valid credentials');
      setRefreshToken(token, res)
      return next();
    }
  }
}

function getCookieData(reqCookie:string){
  const {length: lengthName} = TOKEN_NAME
  const {length} = reqCookie

  const result = {
    authToken: reqCookie.substring(lengthName + 1, length),
    reqTokenName: reqCookie.substring(0, lengthName)
  }

  return result
}

function isInvalidTokenName(tokenName:string | undefined){
  if (tokenName && tokenName === TOKEN_NAME){
    return false
  }
  return true
}

function isValidToken(someToken: string){
  try {
    const payload = verify(someToken, TOKEN_SECRET)
    debug('Token: ', payload);
    return payload
  } catch (err){
    debug('\n---Error validating token---\n:')
    return null
  }
}

function setRefreshToken(decodedToken: any, res: Response){
  const {userId, mail} = decodedToken
  const refreshToken = sign({userId, mail}, TOKEN_SECRET, {expiresIn: '15min'})
  res.cookie(TOKEN_NAME, refreshToken);
  debug('refresh token set')
}

export default isAuth;