import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../../models/course';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit, OnDestroy {
  public searchQuery: string;

  public cards: Array<Course>;

  constructor() { }

  ngOnInit(): void {
    this.cards = [
      {
        id: 1,
        title: 'string',
        creationDate: new Date(),
        duration: 32132132,
        description: 'dasdasdasdasdads',
        photoUrl: 'https://pp.userapi.com/c633229/v633229768/32eda/ParroCv4zUw.jpg?ava=1'
      }
    ];
    console.log('Init CourseListComponent');
  }

  ngOnDestroy(): void {
    this.cards = [];
    console.log('Destroy CourseListComponent');
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
