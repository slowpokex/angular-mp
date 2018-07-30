import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { ConfigService } from '../common/config/config.service';
import { Course } from '../../models/course';

@Injectable()
export class CoursesService {

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient
  ) {}

  getAllCourses(): Observable<Array<Course>> {
    return this.http.get(`${this.config.getApiUrl()}/courses`, {})
      .pipe(map((data: Array<Course>) => {
        return data.map((item: any) => {
          item.creationDate = new Date(Date.parse(item.creationDate));
          return item;
        });
      }));
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get(`${this.config.getApiUrl()}/courses/${id}`, {})
      .pipe(map((data: any) => {
        if (data.creationDate) {
          data.creationDate = new Date(Date.parse(data.creationDate));
        }
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
