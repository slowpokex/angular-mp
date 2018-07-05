import {
  Controller,
  Get,
  Res,
  HttpStatus
} from '@nestjs/common';
import { join } from 'path';
import { ConfigService } from './config/config.service';

@Controller()
export class SimpleController {

  constructor(private readonly config: ConfigService) {}

  @Get('/echo')
  async findAll() {
    return 'Echo controller';
  }

  @Get('/*')
  async sendIndex(@Res() res) {
    return res
        .status(HttpStatus.OK)
        .sendFile(join(__dirname, '..', this.config.getAppPath(), 'index.html'));
  }
}
