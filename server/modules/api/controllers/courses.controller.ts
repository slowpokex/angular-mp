import { Controller, Get, HttpCode, HttpStatus, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CoursesService } from '../services/courses.service';
import { CourseModel } from '../models/CourseModel';

@Controller('/api/courses/')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllCourses() {
    return this.coursesService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCourse(@Body() newCourse: CourseModel) {
    return this.coursesService.create(newCourse);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findCourseById(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async changeCourse(@Param('id') id: string, @Body() modifiedCourse: CourseModel) {
    return this.coursesService.modify(id, modifiedCourse);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteCourse(@Param('id') id: string) {
    return this.coursesService.delete(id);
  }
}
