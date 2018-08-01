import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CourseModule } from './components/course/course.module';
import { SharedModule } from './components/common/shared.module';
import { LoginModule } from './components/login/login.module';
import { ErrorModule } from './components/error/error.module';
import { AppRoutingModule } from './app-routing.module';
import {UserModule} from './components/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UserModule,
    SharedModule,
    LoginModule,
    CourseModule,
    ErrorModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
