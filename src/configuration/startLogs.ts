// --------------------------------------IMPORTS------------------------------------
// Dependencies
import config from 'config';
const debug = require('debug')('app:prod')

// -----------------------------------MODULE-------------------------------
function startLogs(enviroment: string): void{
  debug('------------ Backend dunning as: ', enviroment, '------------\n\n');

  debug('App name: ', config.get('name'));
  debug('App mail: ', config.get('mail.user'), '\n');
}

export default startLogs;
