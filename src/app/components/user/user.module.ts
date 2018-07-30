import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAuthService } from './user-auth.service';
import { UserAuthGuard } from './user-auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserAuthService,
    UserAuthGuard
  ]
})
export class UserModule { }
