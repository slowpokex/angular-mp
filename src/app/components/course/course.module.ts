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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SharedModule } from '../common/shared.module';
import { ConfigModule } from '../config/config.module';
import { UserModule } from '../user/user.module';
import { CoursePageComponent } from './course-page/course-page.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CoursesService } from './courses.service';
import { PipesModule } from '../../pipes/pipes.module';
import { ConfirmationPopupComponent } from '../common/confirmation-popup/confirmation-popup.component';
import { CourseFormPageComponent } from './course-form-page/course-form-page.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material';
import { CourseRoutingModule } from './course-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ConfigModule,
    UserModule,
    PipesModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    CourseRoutingModule
  ],
  exports: [
    CoursePageComponent,
    CourseFormPageComponent
  ],
  entryComponents: [
    ConfirmationPopupComponent
  ],
  declarations: [
    CourseAddComponent,
    CourseCardComponent,
    CourseListComponent,
    CourseSearchComponent,
    CoursePageComponent,
    CourseFormPageComponent
  ],
  providers: [
    CoursesService,
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }
  ],
})
export class CourseModule { }
