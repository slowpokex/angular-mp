import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAuthService } from './user-auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserAuthService
  ]
})
export class UserModule { }
