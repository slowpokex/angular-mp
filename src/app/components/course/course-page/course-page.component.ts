import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import isEmpty from 'lodash/isEmpty';

import * as fromCourses from '../reducers';
import * as CourseActions from '../actions/course';
import { Course } from '../../../models/course';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit, OnDestroy {
  private readonly searchDebouncer = new Subject<string>();
  private searchDebouncerSubscription;

  public searchQuery = '';
  public currentPage = 1;
  public itemsPerPage = 20;

  public cards$ = this.store.pipe(select(fromCourses.getAllCourses));
  public cardsPending$ = this.store.pipe(select(fromCourses.getCoursePending));

  constructor(
    private readonly router: Router,
    private readonly coursesService: CoursesService,
    private store: Store<fromCourses.State>
  ) { }

  ngOnInit(): void {
    this.loadCards();
    this.searchDebouncerSubscription = this.searchDebouncer
      .pipe(
        filter((val: string) => val.length >= 3 || isEmpty(val)),
        debounceTime(250)
      )
      .subscribe(() => this.loadCards());
  }

  ngOnDestroy(): void {
    this.searchDebouncerSubscription.unsubscribe();
  }

  public loadCards(): void {
    this.store.dispatch(new CourseActions.LoadAllCourses({
      start: this.getOffset(),
      count: this.itemsPerPage,
      textFragment: this.searchQuery,
    }));
  }

  public triggerAddPage(): void {
    this.router.navigate(['/course/new']);
  }

  getOffset(): number {
    return this.itemsPerPage * (this.currentPage - 1);
  }

  changeSearch(): void {
    this.searchDebouncer.next(this.searchQuery);
  }

  editCard(course: Course) {
    this.router.navigate([`/course/${course.id}`]);
  }

  deleteCard(course: Course) {
    this.coursesService
      .deleteCourse(course.id)
      .subscribe((deletedCourse: Course) => {
        console.log(`The ${deletedCourse.title} has been deleted!`);
        this.loadCards();
      });
  }
}
