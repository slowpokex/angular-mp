import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { CommonModule } from '../common/common.module';
import { CoursePageComponent } from './course-page/course-page.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CoursesService } from './courses.service';
import { ConfigService } from '../common/config/config.service';
import { PipesModule } from '../../pipes/pipes.module';
import { ConfirmationPopupComponent } from '../common/confirmation-popup/confirmation-popup.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    PipesModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule
  ],
  exports: [
    CoursePageComponent
  ],
  entryComponents: [
    ConfirmationPopupComponent
  ],
  declarations: [
    CourseAddComponent,
    CourseCardComponent,
    CourseListComponent,
    CourseSearchComponent,
    CoursePageComponent
  ],
  providers: [
    ConfigService,
    CoursesService
  ],
})
export class CourseModule { }
