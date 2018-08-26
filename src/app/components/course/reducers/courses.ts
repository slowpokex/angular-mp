import get from 'lodash/get';

import { Course } from '../../../models/course';
import { CourseActions, CourseActionTypes } from '../actions/course';

export interface State {
    courses: Array<Course>;
    pending: boolean;
}

export const initialState: State = {
    courses: [],
    pending: false,
};

export function reducer(state = initialState, action: CourseActions) {
    switch(action.type) {
        case CourseActionTypes.LoadAllCourses: {
            return {
                ...state,
                pending: true
            }
        }
        case CourseActionTypes.LoadAllCoursesSuccess: {
            return {
                ...state,
                pending: false,
                courses: action.payload
            };
        };
        case CourseActionTypes.LoadAllCoursesFailture: {
            return {
                ...state,
                pending: false,
            };
        }
        default:{
            return state;
        };
    }
}

export const getCourses = (state: State) => get(state, 'courses');
export const getPending = (state: State) => get(state, 'pending');
