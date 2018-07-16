import { Component, OnInit } from '@angular/core';

import { UserAuthService } from '../../user/user-auth.service';
import { User } from '../../user/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentUser: User = null;
  public isAuthenticated = false;

  constructor(private readonly userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.userAuthService.isAuthenticated().then((isAuth: boolean) =>{
      this.isAuthenticated = isAuth;
    })
    this.userAuthService.getUserInfo().then((userData: User) => {
      this.currentUser = userData;
    });
  }

  onLogout() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.userAuthService.logout();
  }
}
