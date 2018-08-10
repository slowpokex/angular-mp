import * as dotenv from 'dotenv';

// Import env variables
dotenv.config();

const DEFAULT_CONFIG = {
  env: process.env.NODE_ENV || 'development',
  server: {
    host: process.env.HOST || 'http://localhost',
    port: (process.env.PORT || 8080) as number,
  },
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb', // <- Test connection
  },
  security: {
    secretKey: process.env.JWT_SECRET_KEY || 'angular-nest-app', // <- Default secret
  }
};

export default Object.assign({}, DEFAULT_CONFIG);
