import { NgModule } from '@angular/core';
import {Route, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { ErrorPageComponent } from './components/error/error-page/error-page.component';
import {environment} from '../environments/environment';

const ROUTES: Array<Route> = [
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/course', pathMatch: 'full'},
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      ROUTES,
      {
        enableTracing: !environment.production, // <-- debugging purposes only
        useHash: false
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
