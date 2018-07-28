import { Component, OnInit, OnDestroy } from '@angular/core';

import isEmpty from 'lodash/isEmpty';

import { Course } from '../../../models/course';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit, OnDestroy {
  public onAddPage = false;
  public searchQuery = '';
  public cards: Array<Course>;

  constructor(private readonly coursesService: CoursesService) { }

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
    this.onAddPage = !this.onAddPage;
  }

  hasCourses(): boolean {
    return !isEmpty(this.cards);
  }

  addCard(course: Course) {
    console.log(course);
    this.triggerAddPage();
  }

  editCard(course: Course) {
    console.log(course);
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
