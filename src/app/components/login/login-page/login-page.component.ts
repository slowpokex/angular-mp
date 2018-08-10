import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../user/services/user-auth.service';
import { Router } from '@angular/router';

import { LoginFormData } from '../interfaces/login-form.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public user: LoginFormData = {};

  constructor(
    private readonly router: Router,
    private readonly userAuthService: UserAuthService
  ) { }

  ngOnInit() {}

  onLogin(event: Event): void {
    this.userAuthService
      .login(this.user)
      .then(() => this.router.navigate(['/course']));
  }

  onRegister(): void {
    this.userAuthService.register();
  }
}
