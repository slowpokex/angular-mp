import * as dotenv from 'dotenv';

// Import env variables
dotenv.config();

const DEFAULT_CONFIG = {
  env: process.env.NODE_ENV || 'development',
  server: {
    host: process.env.HOST || 'http://localhost',
    port: (process.env.PORT || 8888) as number,
  },
};

export default Object.assign({}, DEFAULT_CONFIG);
