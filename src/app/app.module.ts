import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CourseModule } from './components/course/course.module';
import { CommonModule } from './components/common/common.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    CourseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
