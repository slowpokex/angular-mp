import { Component, OnInit, OnDestroy } from '@angular/core';

import isEmpty from 'lodash/isEmpty';

import { Course } from '../../../models/course';
import { CoursesService } from '../courses.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit, OnDestroy {
  public searchQuery = '';
  public currentPage = 1;
  public itemsPerPage = 20;
  public isLoaded = false;

  public cards: Array<Course>;

  constructor(
    private readonly router: Router,
    private readonly coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.loadCards().then(() => {
      this.isLoaded = true;
    });
  }

  async loadCards(): Promise<Array<Course>> {
    return this.coursesService
      .getAllCourses(this.getOffset(), this.itemsPerPage, this.searchQuery)
      .toPromise()
      .then((cards: Array<Course>) => {
        this.cards = cards;
        return cards;
      });
  }

  ngOnDestroy(): void {
    this.cards = [];
  }

  public triggerAddPage(): void {
    this.router.navigate(['/course/new']);
  }

  getOffset(): number {
    return this.itemsPerPage * (this.currentPage - 1);
  }

  changeSearch(): void {
    this.loadCards();
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
