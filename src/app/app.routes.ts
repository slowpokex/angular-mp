import { Route } from '@angular/router';

import { CoursePageComponent } from './components/course/course-page/course-page.component';
import { CourseAddPageComponent } from './components/course/course-add-page/course-add-page.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { ErrorPageComponent } from './components/error/error-page/error-page.component';

export const ROUTES: Array<Route> = [
  { path: 'course', component: CoursePageComponent },
  { path: 'course/add', component: CourseAddPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/course', pathMatch: 'full'},
  { path: '**', component: ErrorPageComponent }
];
