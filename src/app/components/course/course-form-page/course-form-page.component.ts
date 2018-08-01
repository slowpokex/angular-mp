import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import isEmpty from 'lodash/isEmpty';
import random from 'lodash/random';

import { Course } from '../../../models/course';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-form-page',
  templateUrl: './course-form-page.component.html',
  styleUrls: ['./course-form-page.component.scss']
})
export class CourseFormPageComponent implements OnInit {

  private createUpdateAction: (body: Course) => Observable<any>;
  // TODO: Temporary mock data. Will be added on BE
  public users = [
    'John Doe',
    'Wolverine',
    'Mystic',
    'Dr. X'
  ];

  public isEditPage = false;
  public course: Partial<Course> = {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.coursesService.getCourseById(id).subscribe((course: Partial<Course>) => {
        if (!course) {
          return this.leaveToCoursePage();
        }
        this.course = course;
      });
    }

    // const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   this.isEditPage = true;
    //   this.createUpdateAction = (body: Course): Observable<any> =>
    //     !this.isEditPage ? this.coursesService.createCourse(body) : this.coursesService.updateCourse(body.id, body);
    //   this.coursesService.getCourseById(id).subscribe((course: Partial<Course>) => {
    //     this.course = course;
    //   });
    // }
    // TODO: This is also working solution
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => this.coursesService.getCourseById(params.get('id')))
    // ).subscribe((course: Partial<Course>) => {
    //   if (!course) {
    //     this.leaveToCoursePage();
    //   }
    //   this.isEditPage = !isEmpty(course);
    //   this.createUpdateAction = (body: Course): Observable<any> =>
    //     !this.isEditPage ? this.coursesService.createCourse(body) : this.coursesService.updateCourse(body.id, body);
    //   this.course = course;
    // });
  }

  onConfirmCourse(): void {
    if (!this.isEditPage) {
      this.course.id = random(Number.MAX_SAFE_INTEGER, false);
    }
    console.log(this.course);
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
