import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../user/reducers';
import * as Auth from '../../user/actions/user-auth';

import { LoginFormData } from '../interfaces/login-form.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));
  user: LoginFormData = {};

  constructor(private store: Store<fromAuth.State>) { }

  ngOnInit() {}

  onLogin(event: Event): void {
    this.store.dispatch(new Auth.Login(this.user));
  }

  onRegister(): void {
    // this.userAuthService.register();
  }
}
