import { Pipe, PipeTransform } from '@angular/core';
import { Sorting } from '../../enums/sorting.enum';
import { Course } from '../../models/course';

import orderBy from 'lodash/orderBy';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(courses: Array<Course>, sort: Sorting = Sorting.CREATION_ASC): Array<Course> {
    const [field, order] = sort.split('_');
    return orderBy(courses, field, order);
  }
}


