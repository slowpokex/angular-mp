import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './components/user/services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isAuthenticated = false;

  constructor(private readonly userAuthService: UserAuthService) {}

  ngOnInit(): void {
    this.userAuthService.getChangeAuthSubscription().subscribe((isAuth: boolean) => {
      this.isAuthenticated = isAuth;
    });
  }
}
