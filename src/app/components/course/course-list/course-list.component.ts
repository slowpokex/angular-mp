import { Component, Input, EventEmitter, Output } from '@angular/core';

import isEmpty from 'lodash/isEmpty';

import { Course } from '../../../models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {

  @Input()
  public cardList: Array<Course>;

  @Output()
  public cardListChanged = new EventEmitter<Array<Course>>();

  constructor() { }

  public hasCards(): boolean {
    return !isEmpty(this.cardList);
  }

  public editCard(course: Course) {
    console.log('Edit', course);
  }

  public deleteCard(course: Course) {
    console.log('Delete', course);
  }

  public onLoadCards(event: Event) {
    if (!this.hasCards()) {
      return;
    }
    console.log('Load controllers');
  }
}
