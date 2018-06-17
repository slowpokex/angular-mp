import express = require('express');
import { join } from 'path';

import apiRouter from './api';

const app = express();
const COMPILED_APP_PATH = '../dist/angular-mp';

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, COMPILED_APP_PATH)));
  app.get('/*', (req, res): void => {
    res.sendFile(join(__dirname, COMPILED_APP_PATH, 'index.html'));
  });
}

app.use('/api', apiRouter);

export default app;
