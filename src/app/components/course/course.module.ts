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

import { CoursePageComponent } from './course-page/course-page.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CommonModule } from '../common/common.module';
import {CoursesService} from './courses.service';
import {ConfigService} from '../common/config/config.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule
  ],
  exports: [
    CoursePageComponent
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
