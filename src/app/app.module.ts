import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Import immutable store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers } from './reducers';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CourseModule } from './components/course/course.module';
import { SharedModule } from './components/common/shared.module';
import { LoginModule } from './components/login/login.module';
import { ErrorModule } from './components/error/error.module';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './components/user/user.module';

@NgModule({
  imports: [
    // Libs modules
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Init state
    StoreModule.forRoot({}),

    // Init router state
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),

    // Init devtool for state
    StoreDevtoolsModule.instrument({
      name: 'NgRx Course Store DevTools',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),

    // Custom modules
    UserModule,
    SharedModule,
    LoginModule,
    CourseModule,
    ErrorModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
