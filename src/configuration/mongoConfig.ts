// --------------------------------------IMPORTS------------------------------------
// Dependencies
import config from 'config';
import mongoose from 'mongoose';
const debugProd = require('debug')('app:prod')

// -------------------------------------MODULE---------------------------------
async function mongoConnect(): Promise<void>{
  // Mongo conect to base
  try {
    await mongoose.connect(config.get('mongoDB'), {useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true}) // Return a promise
    debugProd(`Conected to ${config.get('mongoDB')}...`)
  } catch (err){
    debugProd('Couldnt connect because:\n', err)
  } finally {
    debugProd('Connection finished...')
  }
}

export default mongoConnect;
