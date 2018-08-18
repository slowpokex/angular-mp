import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseAddComponent  {

  @Output()
  public readonly onOpenAdd = new EventEmitter<void>();

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'add',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-add-24px.svg'));
  }

  openAddPage(): void {
    this.onOpenAdd.emit();
  }
}
