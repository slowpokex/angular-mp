import { Injectable } from '@nestjs/common';
import { CourseModel } from '../models/CourseModel';

import { find, findIndex } from 'lodash';

@Injectable()
export class CoursesService {
  private readonly courses: Array<CourseModel> = [{
    id: 1,
    title: 'React Native',
    creationDate: new Date(),
    duration: 72000,
    description: 'Mobile applications are one of the best ways to engage with users - no wonder everyone wants to build one!\n',
    photoUrl: 'https://cms-assets.tutsplus.com/uploads/users/41/posts/24969/preview_image/react-native@2x.jpg',
    topRated: true
  }, {
    id: 2,
    title: 'Angular in the Depth',
    creationDate: new Date(Date.now() - (3600 * 24 * 7 * 1000)),
    duration: 172000,
    description: 'There are a lot of courses that dive deeply into' +
      ' Angular but sometimes you just want to build an entire app and see how it all works in practice.' +
      ' And you want to use all these great third-party packages that can add a lot of awesome functionalities to your Angular app!',
    photoUrl: 'https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/angular-js-512.png',
    topRated: false
  }, {
    id: 3,
    title: 'Node.js Master class',
    creationDate: new Date(Date.now() - (3600 * 24 * 7 * 1000 * 3)),
    duration: 1172000,
    description: 'This course provides you with a practical approach to Node.js.' +
      ' The main focus of this course is to get you familiar with' +
      ' Node and ensure that you are ready to build cool new web applications using Node in no time.',
    photoUrl: 'https://cdn.iconscout.com/public/images/icon/free/png-512/nodejs-logo-36559ec903b263f5-512x512.png',
    topRated: true
  }, {
    id: 4,
    title: 'Vue for Beginners',
    creationDate: new Date(Date.now() + (3600 * 24 * 7 * 1000 * 2)),
    duration: 72000,
    description: 'Mobile applications are one of the best ways to engage with users - no wonder everyone wants to build one!\n',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png',
    topRated: true
  }];

  async findAll(): Promise<Array<CourseModel>> {
    return this.courses;
  }

  async create(newCourse: CourseModel): Promise<CourseModel> {
    this.courses.push(newCourse);
    return newCourse;
  }

  async findById(id: string): Promise<CourseModel> {
    return find(this.courses, ['id', +id]);
  }

  async modify(id: string, modifiedCourse: CourseModel): Promise<CourseModel> {
    return find(this.courses, ['id', +id]);
  }

  async delete(id: string): Promise<CourseModel> {
    const courseForDelete = find(this.courses, ['id', +id]);
    this.courses.splice(findIndex(this.courses, ['id', +id]), 1);
    return courseForDelete;
  }
}
