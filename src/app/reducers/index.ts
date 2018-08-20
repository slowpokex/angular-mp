import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RouterStateUrl } from '../shared/utils';
import * as fromRouter from '@ngrx/router-store';

import { storeFreeze } from 'ngrx-store-freeze';

export interface AppState {
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}

// console.log all actions
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function (state: AppState, action: any): AppState {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const reducers: ActionReducerMap<AppState> = {
    router: fromRouter.routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [ logger, storeFreeze ]  : [];
