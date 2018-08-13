import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

import isEmpty from 'lodash/isEmpty';

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
  public isLoaded = false;
  public isCardLoading = false;

  public cards: Array<Course>;

  constructor(
    private readonly router: Router,
    private readonly coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.loadCards().then(() => {
      this.isLoaded = true;
    });
    this.searchDebouncerSubscription = this.searchDebouncer
      .pipe(
        filter((val: string) => val.length >= 3 || isEmpty(val)),
        debounceTime(250)
      )
      .subscribe(() => this.loadCards());
  }

  ngOnDestroy(): void {
    this.cards = [];
    this.searchDebouncerSubscription.unsubscribe();
  }

  async loadCards(): Promise<Array<Course>> {
    this.isCardLoading = true;
    return this.coursesService
      .getAllCourses(this.getOffset(), this.itemsPerPage, this.searchQuery)
      .toPromise()
      .then((cards: Array<Course>) => {
        this.cards = cards;
        this.isCardLoading = false;
        return cards;
      })
      .catch(() => {
        this.isCardLoading = false;
        return [];
      });
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
