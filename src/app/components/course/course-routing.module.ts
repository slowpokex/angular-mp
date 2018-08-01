import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseFormPageComponent } from './course-form-page/course-form-page.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { UserAuthGuard } from '../user/user-auth.guard';
import { UserModule } from '../user/user.module';

export const ROUTES: Routes = [
  {
    path: 'course',
    component: CoursePageComponent,
    canActivate: [ UserAuthGuard ],
    data: {
      breadcrumb: 'Course'
    }
  }, {
    path: 'course/:id',
    component: CourseFormPageComponent,
    canActivate: [ UserAuthGuard ],
    data: {
      breadcrumb: 'Course/Edit Course'
    }
  }, {
    path: 'course/new',
    component: CourseFormPageComponent,
    canActivate: [ UserAuthGuard ],
    data: {
      breadcrumb: 'Course/Add Course'
    }
  }
];

@NgModule({
  imports: [
    UserModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class CourseRoutingModule { }

