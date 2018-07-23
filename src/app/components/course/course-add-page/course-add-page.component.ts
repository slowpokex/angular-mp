import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Course } from '../../../models/course';

@Component({
  selector: 'app-course-add-page',
  templateUrl: './course-add-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./course-add-page.component.scss']
})
export class CourseAddPageComponent {

  users = [
    'John Doe',
    'Wolverine',
    'Mystic',
    'Dr. X'
  ];

  @Output()
  public readonly addNewCourse = new EventEmitter<Course>();

  @Output()
  public readonly closeAdd = new EventEmitter<void>();

  constructor() {}

  onAddCourse(): void {
    // TODO: Temporary solution
    console.log('Add course');
    this.closeAdd.emit();
  }

  onBack(): void {
    this.closeAdd.emit();
  }
}
