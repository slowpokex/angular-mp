const express = require('express');
const path = require('path');

const apiRouter = require('./api');

const app = express();

const COMPILED_APP_PATH = '../dist/angular-mp'

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, COMPILED_APP_PATH)));
  app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, COMPILED_APP_PATH, 'index.html'));
  });
}

app.use('/api', apiRouter);

module.exports = app;
