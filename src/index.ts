// --------------------------------------IMPORTS------------------------------------
// Dependencies
import express from 'express';
const debugProd = require('debug')('app:prod');
// Middlewares
import helmet from 'helmet';
import cors from 'cors';
// Routes
import authRoutes from './routes/auth';
// Otros
import getCerts from './configuration/getCerts'
import startLogs from './configuration/startLogs'
import mongoConnect from './configuration/mongoConfig'

// -----------------------------------CONFIG-------------------------------
const app = express();
const enviroment = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 4000

mongoConnect();
startLogs(enviroment); // Just and example of posible use of configs

// -----------------------------------MIDDLEWARES-------------------------------
app.use(express.json()); // Needed to read req.body
app.use(helmet()); // For security
app.use(cors()); // For security

// -----------------------------------ROUTES-------------------------------
app.use('/auth/', authRoutes)

// -----------------------------------SSL-------------------------------
const http = require('http');
const https = require('https');

const trySSL = process.env.USE_SSL || false // Set use of https from enviroment

const server = trySSL ? https : http
const options = trySSL ? getCerts() : {}; // Get ssl certs if https true

// -----------------------------------SERVER-------------------------------
server
  .createServer(options, app)
  .listen(port, () => {
    debugProd('https ', trySSL, ` listening to port ${port}...`)
  });
