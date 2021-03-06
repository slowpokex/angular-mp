import get from 'lodash/get';

import { AuthActions, AuthActionTypes } from '../actions/user-auth';
import { Token } from '../model/token';
import { UserAuthService } from '../services/user-auth.service';

export interface State {
  loggedIn: boolean;
  userData: Token | null;
}

export const initialState: State = {
  loggedIn: UserAuthService.isAuthenticated(),
  userData: UserAuthService.getToken(),
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        userData: action.payload.userData,
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => get(state, 'loggedIn');
export const getToken = (state: State) => get(state, 'userData');
export const getUser = (state: State) => get(state, 'userData.user');
