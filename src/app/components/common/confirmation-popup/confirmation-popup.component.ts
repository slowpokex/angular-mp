import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Course } from '../../../models/course';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent {

  @Output()
  public onSubmitClickEvent: EventEmitter<Course> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    this.onSubmitClickEvent.emit(this.data);
    this.dialogRef.close();
  }
}
