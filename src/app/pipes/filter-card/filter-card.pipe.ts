import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../models/course';

import filter from 'lodash/filter';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';

@Pipe({
  name: 'filterCard'
})
export class FilterCardPipe implements PipeTransform {
  transform(courses: Array<Course>, query: string = ''): Array<Course> {
    if (isEmpty(courses)) {
      return courses;
    }
    return filter(courses, (card: Course) => includes(card.title.toLowerCase(), query.toLowerCase()));
  }
}

