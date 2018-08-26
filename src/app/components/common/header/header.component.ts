import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import isEqual from 'lodash/isEqual';
import { Store, select } from '@ngrx/store';

import { UserAuthService } from '../../user/services/user-auth.service';
import { User } from '../../user/model/user';

import * as fromRoot from '../../../reducers';
import * as fromAuth from '../../user/reducers';
import * as Auth from '../../user/actions/user-auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public loggedIn$: Observable<boolean>;
  public currentUser$: Observable<User>;

  constructor(private store: Store<fromRoot.AppState>) {
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
    this.currentUser$ = this.store.pipe(select(fromAuth.getUser));
  }

  onLogout() {
    this.store.dispatch(new Auth.Logout());
  }
}
