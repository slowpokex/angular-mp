import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';
import * as fromRoot from '../../../reducers';

import * as fromCourses from './courses';
import * as fromCourseForm from './course-form';

export interface CoursesState {
    courses: fromCourses.State;
    course: fromCourseForm.State;
}

export interface State extends fromRoot.AppState {
    courses: CoursesState;
}

export const reducers: ActionReducerMap<CoursesState> = {
    courses: fromCourses.reducer,
    course: fromCourseForm.reducer
};

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectCourseStatusState = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.courses
);

export const getAllCourses = createSelector(selectCourseStatusState, fromCourses.getCourses);
export const getCoursePending = createSelector(selectCourseStatusState, fromCourses.getPending);
