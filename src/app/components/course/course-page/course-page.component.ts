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
  public searchQuery: string;

  public cards: Array<Course>;

  constructor(private readonly coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService
      .getAllCourses()
      .subscribe((cards: Array<Course>) => {
        this.cards = cards;
        console.log('Loaded cards!');
      });
  }

  ngOnDestroy(): void {
    this.cards = [];
  }

  hasCourses(): boolean {
    return !isEmpty(this.cards);
  }

  searchClick(value: string) {
    console.log(value);
  }

  editCard(course: Course) {
    console.log(course);
  }

  deleteCard(course: Course) {
    console.log(course);
  }
}
