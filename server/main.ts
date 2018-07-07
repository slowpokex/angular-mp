import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { join } from 'path';

import config from './config/config';

const PORT = config.server.port;
const COMPILED_APP_PATH = '../dist/angular-mp';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useStaticAssets(join(__dirname, COMPILED_APP_PATH));
  app.enableCors();
  await app.listen(PORT);
}

bootstrap()
  .then(() => console.log(`Successfully started on ${PORT} port!`))
  .catch(err => console.error(err));
