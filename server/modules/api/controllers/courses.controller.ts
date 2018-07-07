import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import { CoursesService } from '../services/courses.service';

@Controller('/api/courses')
export class CoursesController {

  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.coursesService.getAllCourses();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById() {
    return 'Echo controller';
  }
}
