import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../common/config/config.service';

@Injectable()
export class CoursesService {

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient
  ) {
    console.log(`${this.config.getApiUrl()}/courses`);
  }

  getAllCourses(): Observable<any> {
    return this.http.get(`${this.config.getApiUrl()}/courses`, {});
  }
}
