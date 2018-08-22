import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { Course } from '../../../models/course';

import * as fromCourses from './courses';

export interface CoursesState {
    courses: fromCourses.State;
}

export interface State extends fromRoot.AppState {
    courses: CoursesState;
}

export const reducers: ActionReducerMap<CoursesState> = {
    courses: fromCourses.reducer
};

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectCourseStatusState = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.courses
);

export const getAllCourses = createSelector(selectCourseStatusState, fromCourses.getCourses);
export const getCoursePending = createSelector(selectCourseStatusState, fromCourses.getPending);
