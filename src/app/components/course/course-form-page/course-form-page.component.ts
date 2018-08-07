import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Observable } from 'rxjs';

import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import isNaN from 'lodash/isNaN';

import { Course } from '../../../models/course';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-form-page',
  templateUrl: './course-form-page.component.html',
  styleUrls: ['./course-form-page.component.scss']
})
export class CourseFormPageComponent implements OnInit {
  public isEditPage = false;
  public course: Partial<Course> = {
    duration: 0
  };

  private createUpdateAction = (body: Course): Observable<any> => this.coursesService.updateCourse(body.id, body);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = parseInt(params.get('id'), 10);

      if (isNumber(id) && !isNaN(id)) {
          this.coursesService.getCourseById(id).subscribe((course: Partial<Course>) => {
            if (!course) {
              return this.leaveToCoursePage();
            }
            this.course = course;
            this.isEditPage = !isEmpty(course);
          });
      }
    });
  }

  onConfirmCourse(): void {
    if (!this.isEditPage) {
      this.createUpdateAction = (body: Course): Observable<any> => this.coursesService.createCourse(body);
    }

    // TODO: Multiplier for milliseconds
    if (this.course.duration) {
      this.course.duration = this.course.duration * 1000;
    }

    this.createUpdateAction(this.course as Course).subscribe(() => {
      this.leaveToCoursePage();
    });
  }

  onBack(): void {
    this.leaveToCoursePage();
  }

  async leaveToCoursePage(): Promise<void> {
    return this.router
      .navigate(['/course'])
      .then(() => {
        this.course = {};
      });
  }
}
