import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { ConfigService } from '../common/config/config.service';
import {Course} from '../../models/course';

@Injectable()
export class CoursesService {

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient
  ) {
    console.log(`${this.config.getApiUrl()}/courses`);
  }

  getAllCourses(): Observable<any> {
    return this.http.get(`${this.config.getApiUrl()}/courses`, {})
      .pipe(map((data: Array<Course>) => {
        return data.map((item: any) => {
          item.creationDate = new Date(Date.parse(item.creationDate));
          return item;
        });
      }));
  }
}
