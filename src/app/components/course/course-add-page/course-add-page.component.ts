import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Course } from '../../../models/course';

@Component({
  selector: 'app-course-add-page',
  templateUrl: './course-add-page.component.html',
  styleUrls: ['./course-add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseAddPageComponent {

  // TODO: Temporary mock data. Will be added on BE
  public users = [
    'John Doe',
    'Wolverine',
    'Mystic',
    'Dr. X'
  ];

  public course: Partial<Course> = {};

  @Output()
  public readonly addNewCourse = new EventEmitter<Partial<Course>>();

  @Output()
  public readonly closeAdd = new EventEmitter<void>();

  constructor() {}

  onAddCourse(): void {
    this.addNewCourse.emit(this.course);
  }

  onBack(): void {
    this.closeAdd.emit();
  }
}
