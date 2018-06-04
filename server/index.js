const express = require('express');
const path = require('path');

const app = express();

const DEFAULT_PATH = '../dist/angular-mp'

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, DEFAULT_PATH)));
  app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, DEFAULT_PATH, 'index.html'));
  });
}

module.exports = app;
