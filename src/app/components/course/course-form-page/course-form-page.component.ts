import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import random from 'lodash/random';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import isNaN from 'lodash/isNaN';
import pick from 'lodash/fp/pick';

import * as fromCourses from '../reducers';
import { Course } from '../../../models/course';
import { CoursesService } from '../courses.service';

const pickCourse = pick(['id', 'title', 'description', 'duration', 'creationDate', 'photoUrl', 'topRated']);

@Component({
  selector: 'app-course-form-page',
  templateUrl: './course-form-page.component.html',
  styleUrls: ['./course-form-page.component.scss']
})
export class CourseFormPageComponent implements OnInit {
  public isEditPage = false;

  private durationValidator = (value: string): ValidatorFn =>
    (control: AbstractControl): {[key: string]: any} | null =>
      !isNumber(control.value) ? {'incorrectDuration': { value: control.value }} : null;

  private photoUrlValidator = (value: string): ValidatorFn => {
    const URL_PATTERN = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return (control: AbstractControl): {[key: string]: any} | null =>
      !URL_PATTERN.test(control.value) ? {'incorrectUrl': { value: control.value }} : null;
  }      

  public courseForm = this.fb.group({
    id: [random(Number.MAX_SAFE_INTEGER), Validators.required],
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    duration: [0, [Validators.required, this.durationValidator]],
    creationDate: [new Date()],
    photoUrl: ['', [Validators.required, this.photoUrlValidator]],
    topRated: [false, [Validators.required]]
  });

  private createUpdateAction = (body: Course): Observable<any> => this.coursesService.updateCourse(body.id, body);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly coursesService: CoursesService,
    private readonly store: Store<fromCourses.State>,
    private readonly fb: FormBuilder
  ) {}  

  ngOnInit(): void {
    // Clean form before leaving page
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(() => {
      this.courseForm.reset()
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = parseInt(params.get('id'), 10);

      if (isNumber(id) && !isNaN(id)) {
          this.coursesService.getCourseById(id)
          .pipe(map(pickCourse))
          .subscribe((course: Partial<Course>) => {
            if (!course) {
              return this.leaveToCoursePage();
            }
            this.courseForm.setValue(course)
            this.isEditPage = !isEmpty(course);
          });
      }
    });
  }

  onConfirmCourse(): void {
    if (this.courseForm.invalid || this.courseForm.pending) {
      return;
    }

    const course = this.courseForm.getRawValue() as Course;

    if (!this.isEditPage) {
      this.createUpdateAction = (body: Course): Observable<any> => this.coursesService.createCourse(body);
    }

    // TODO: Multiplier for milliseconds
    if (course.duration) {
      course.duration = course.duration * 1000;
    }

    this.createUpdateAction(course).subscribe(() => {
      this.leaveToCoursePage();
    });
  }

  onBack(): void {
    this.leaveToCoursePage();
  }

  leaveToCoursePage(): void {
    this.router.navigate(['/course']);
  }
}
