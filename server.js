const express = require('express');
const path = require('path');

const app = express();

const DEFAULT_PATH = '/dist/angular-mp'

app.use(express.static(path.join(__dirname, DEFAULT_PATH)));

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname, DEFAULT_PATH, 'index.html'));
});

app.listen(process.env.PORT || 8080);
