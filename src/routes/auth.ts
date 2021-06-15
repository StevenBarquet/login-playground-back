// --------------------------------------IMPORTS------------------------------------
// Dependencies
import express, {Request, Response} from 'express';
const debug = require('debug')('app:routes');

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
    res.cookie('userID', 'token')
    res.send({status: 'success'});
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