import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  declarations: [
    LoginPageComponent
  ],
  exports: [
    LoginPageComponent
  ]
})
export class LoginModule { }
