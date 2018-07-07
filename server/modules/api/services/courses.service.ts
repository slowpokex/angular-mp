import { Injectable } from '@nestjs/common';
import { CourseModel } from '../models/CourseModel';

@Injectable()
export class CoursesService {
  private readonly courses = [{
    id: 1,
    title: 'string',
    creationDate: new Date(),
    duration: 32132132,
    description: 'dasdasdasdasdads',
    photoUrl: 'https://pp.userapi.com/c633229/v633229768/32eda/ParroCv4zUw.jpg?ava=1'
  }];

  async getAllCourses(): Promise<Array<CourseModel>> {
    return this.courses;
  }
}
