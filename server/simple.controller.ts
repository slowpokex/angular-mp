import { Controller, Get, HttpCode, Res, HttpStatus } from '@nestjs/common';
import { join } from 'path';

const COMPILED_APP_PATH = '../dist/angular-mp';

@Controller()
export class SimpleController {
  @Get('/echo')
  findAll() {
    return 'Echo controller';
  }

  @Get('/*')
  async sendIndex(@Res() res) {
    return res
        .status(HttpStatus.OK)
        .sendFile(join(__dirname, COMPILED_APP_PATH, 'index.html'));
  }
}