import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { CoursesService } from './services/courses.service';
import { CoursesController } from './controllers/courses.controller';

@Module({
  imports: [
    CommonModule
  ],
  controllers: [
    CoursesController
  ],
  providers: [
    CoursesService
  ]
})
export class ApiModule {}
