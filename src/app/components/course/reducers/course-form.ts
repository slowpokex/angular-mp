import { CourseActions } from '../actions/course';
import { Course } from '../../../models/course';

export interface State {
    course: Partial<Course>;
    pending: boolean;
}

export const initialState: State = {
    course: {},
    pending: false,
};

export function reducer(state = initialState, action: CourseActions) {
    return state;
}
