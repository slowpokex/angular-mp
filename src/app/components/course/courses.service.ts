import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { ConfigService } from '../config/config.service';
import { Course } from '../../models/course';

@Injectable()
export class CoursesService {

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient
  ) {}

  getAllCourses(start: number = 0, count: number = 0, textFragment: string = ''): Observable<Array<Course>> {
    return this.http.get(`${this.config.getApiUrl()}/courses`, {
      params: {
        start: String(start),
        count: String(count),
        textFragment
      }
    })
      .pipe(map((data: Array<Course>) => {
        return data.map((item: any) => {
          item.id = item._id;
          item.creationDate = new Date(Date.parse(item.creationDate));
          delete item._id;
          return item;
        });
      }));
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.config.getApiUrl()}/courses/${id}`, {})
      .pipe(map((data: any) => {
        data.id = data._id;
        data.duration /= 1000;
        return data;
      }));
  }

  createCourse(courseDto: Course) {
    return this.http.post(`${this.config.getApiUrl()}/courses`, courseDto, {})
      .pipe(map((data: any) => {
        data.creationDate = new Date(Date.parse(data.creationDate));
        return data;
      }));
  }

  updateCourse(id: number, courseDto: Course) {
    return this.http.put(`${this.config.getApiUrl()}/courses/${id}`, courseDto, {})
      .pipe(map((data: any) => {
        data.creationDate = new Date(Date.parse(data.creationDate));
        return data;
      }));
  }

  deleteCourse(id: number) {
    return this.http.delete(`${this.config.getApiUrl()}/courses/${id}`, {})
      .pipe(map((data: any) => {
        data.creationDate = new Date(Date.parse(data.creationDate));
        return data;
      }));
  }
}
