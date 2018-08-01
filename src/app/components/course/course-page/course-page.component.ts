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
  public cards: Array<Course>;

  constructor(
    private readonly router: Router,
    private readonly coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.coursesService
      .getAllCourses()
      .subscribe((cards: Array<Course>) => {
        this.cards = cards;
      });
  }

  ngOnDestroy(): void {
    this.cards = [];
  }

  public triggerAddPage(): void {
    this.router.navigate(['/course/add']);
  }

  hasCourses(): boolean {
    return !isEmpty(this.cards);
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
