import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

import isEmpty from 'lodash/isEmpty';

import { Course } from '../../../models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListComponent {

  @Input()
  public cardList: Array<Course>;

  @Output()
  public readonly cardListChanged = new EventEmitter<Array<Course>>();

  @Output()
  public readonly editCardEvent = new EventEmitter<Course>();

  @Output()
  public readonly deleteCardEvent = new EventEmitter<Course>();

  constructor() { }

  public hasCards(): boolean {
    return !isEmpty(this.cardList);
  }

  public editCard(course: Course) {
    this.editCardEvent.emit(course);
  }

  public deleteCard(course: Course) {
    this.deleteCardEvent.emit(course);
  }

  public onLoadCards(event: Event) {
    if (!this.hasCards()) {
      return;
    }
    console.log('Load controllers');
  }
}
