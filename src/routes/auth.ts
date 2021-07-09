// --------------------------------------IMPORTS------------------------------------
// Dependencies
import express, {Request, Response} from 'express';
import {sign} from 'jsonwebtoken';
const debug = require('debug')('app:routes');
// Others
import {TOKEN_NAME, TOKEN_SECRET} from '../configuration/globalData'

const router = express.Router();

const user = {
  _id: '123456',
  mail: 'botz@gmail.com',
  pass: 'comic456',
  permissions: ['adminProducts', 'storeCart']
}
// ---------------------------------------------------ROUTES---------------------------------------------
router.post('/login', (req: Request, res: Response) => {
  debug('requested for: ', req.originalUrl)

  const isAuth = validCredentials(req.body);

  if (isAuth){
    const {_id, mail} = user
    const accessToken = sign({userId: _id, mail}, TOKEN_SECRET, {expiresIn: '15min'})
    res.cookie(TOKEN_NAME, accessToken);
    res.send({status: 'success', accessToken});
  } else {
    res.send({status: 'bad-credentials'})
  }
});

// -------------------------------------------------QUERYS-----------------------------------------
interface LoginObj {
  mail: string;
  pass: string;
}
function validCredentials(data: LoginObj){
  const {mail: reqMail, pass: reqPass} = data;
  const {mail, pass} = user;
  if (reqMail === mail && reqPass === pass){
    return true
  }
  return false
}

export default router;