import { AuthActions, AuthActionTypes } from './../actions/user-auth';
import { Token } from '../model/token';

export interface State {
  loggedIn: boolean;
  userData: Token | null;
}

export const initialState: State = {
  loggedIn: false,
  userData: null,
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

export const getLoggedIn = (state: State) => state.loggedIn;
export const getToken = (state: State) => state.userData;
export const getUser = (state: State) => state.userData.user;
