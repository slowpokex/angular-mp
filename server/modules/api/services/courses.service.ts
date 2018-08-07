import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { defaultTo } from 'lodash';

import { CourseModel } from '../models/course.model';
import { CourseDto } from '../dto/course.dto';

@Injectable()
export class CoursesService {
  constructor(@InjectModel('Course') private readonly courseModel: Model<CourseModel>) {}

  async create(newCourse: CourseDto): Promise<CourseModel> {
    const createdCourse = new this.courseModel(newCourse);
    return await createdCourse.save();
  }

  async findAll(start: number, count: number, textFragment: string = ''): Promise<Array<CourseModel>> {
    return this.courseModel
      .find({ title: new RegExp('^' + textFragment, 'i') })
      .skip(defaultTo(start, 0))
      .limit(defaultTo(count, Number.MAX_SAFE_INTEGER))
      .exec();
  }

  async findById(id: string): Promise<CourseModel> {
    return this.courseModel.findById(id).exec();
  }

  async modify(id: string, modifiedCourse: CourseDto): Promise<CourseModel> {
    return this.courseModel.findByIdAndUpdate(id, modifiedCourse).exec();
  }

  async delete(id: string): Promise<CourseModel> {
    return this.courseModel.findByIdAndRemove(id).exec();
  }
}
