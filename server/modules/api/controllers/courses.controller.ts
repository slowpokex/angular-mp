import {Controller, Get, HttpCode, HttpStatus, Post, Put, Delete, Param, Body, UseGuards, Query} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CoursesService } from '../services/courses.service';
import { CourseDto } from '../dto/course.dto';
// import { AuthGuard } from '../../auth/auth.guard';

@Controller('/api/courses/')
@UseGuards(AuthGuard('jwt'))
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllCourses(
    @Query('start') start: string,
    @Query('count') count: string,
    @Query('textFragment') textFragment: string
  ) {
    return this.coursesService.findAll(+start, +count, textFragment);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCourse(@Body() newCourse: CourseDto) {
    return this.coursesService.create(newCourse);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findCourseById(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async changeCourse(@Param('id') id: string, @Body() modifiedCourse: CourseDto) {
    return this.coursesService.modify(id, modifiedCourse);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteCourse(@Param('id') id: string) {
    return this.coursesService.delete(id);
  }
}
