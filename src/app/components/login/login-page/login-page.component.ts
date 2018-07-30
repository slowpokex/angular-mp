import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../user/user-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly userAuthService: UserAuthService
  ) { }

  ngOnInit() {}

  onLogin(): void {
    this.userAuthService
      .login()
      .then(() => this.router.navigate(['/course']));
  }

  onRegister(): void {
    this.userAuthService.register();
  }
}
