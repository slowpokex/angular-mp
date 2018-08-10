import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { CoursesService } from './services/courses.service';
import { CoursesController } from './controllers/courses.controller';
import { CourseSchema } from './schemas/course.schema';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Course',
      schema: CourseSchema
    }]),
    ConfigModule,
    AuthModule
  ],
  controllers: [
    CoursesController
  ],
  providers: [
    CoursesService
  ]
})
export class ApiModule {}
