import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { join } from 'path';

import './config/config';

const PORT: number = Number.parseInt(process.env.PORT) || 8080;
const COMPILED_APP_PATH = '../dist/angular-mp';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.enableCors();
  app.useStaticAssets(join(__dirname, COMPILED_APP_PATH));
  await app.listen(PORT);
}

bootstrap()
  .then(() => console.log(`Successfully started on ${PORT} port!`))
  .catch(err => console.error(err));
