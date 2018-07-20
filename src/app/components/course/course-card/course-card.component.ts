import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

import { Course } from '../../../models/course';
import { ConfirmationPopupComponent } from '../../common/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {

  @Input()
  public card: Course;

  @Output()
  public editClick = new EventEmitter<Course>();

  @Output()
  public deleteClick = new EventEmitter<Course>();

  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    iconRegistry.addSvgIcon('edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-edit-24px.svg'));
    iconRegistry.addSvgIcon('delete',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-delete-24px.svg'));
    iconRegistry.addSvgIcon('rated',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/round-grade-24px.svg'));
  }

  isFresh(): boolean {
    const creationDate = this.card.creationDate.getTime();
    return creationDate < Date.now() && creationDate >= Date.now() - (1000 * 3600 * 24 * 7 * 2);
  }

  isUpcoming(): boolean {
    return this.card.creationDate.getTime() > Date.now();
  }

  onDeleteCource(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '400px',
      data: course
    });
    dialogRef
      .componentInstance
      .onSubmitClickEvent
      .subscribe((data: Course) => this.deleteClick.emit(data));
  }

  onEditCource(course: Course) {
    this.editClick.emit(course);
  }
}
