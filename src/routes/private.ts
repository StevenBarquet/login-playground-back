// --------------------------------------IMPORTS------------------------------------
// Dependencies
import express, {Request, Response} from 'express';
const debug = require('debug')('app:routes');

const router = express.Router();

const data = {
  _id: '123456',
  name: 'Private data',
  cuantity: 87,
  permissions: ['private', 'storeCart']
}
// ---------------------------------------------------ROUTES---------------------------------------------
router.get('/data', (req: Request, res: Response) => {
  debug('requested for: ', req.originalUrl)

  res.send({status: 'success', data});
});

// -------------------------------------------------QUERYS-----------------------------------------
export default router;