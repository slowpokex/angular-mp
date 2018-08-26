import { Action } from '@ngrx/store';
import { Course } from '../../../models/course';

export enum CourseActionTypes {
    LoadAllCourses = '[Course] Load All Courses',
    LoadAllCoursesSuccess = '[Course] Load All Courses Success',
    LoadAllCoursesFailture = '[Course] Load All Courses Success',
    EditCourse = '[Auth] Edit Course',
    EditCourseSuccess = '[Auth] Edit Course Success',
    EditCourseFailture = '[Auth] Edit Course Failture',
    DeleteCourse = '[Auth] Delete Course',
    DeleteCourseSuccess = '[Auth] Delete Course Success',
    DeleteCourseFailture = '[Auth] Delete Course Failture',
    SearchCourse = '[Auth] Search Course',
}

export class LoadAllCourses implements Action {
    readonly type = CourseActionTypes.LoadAllCourses;

    constructor(public payload: {
        start?: number,
        count?: number,
        textFragment?: string
    }) { }
}

export class LoadAllCoursesSuccess implements Action {
    readonly type = CourseActionTypes.LoadAllCoursesSuccess;

    constructor(public payload: Array<Course>) { }
}

export class LoadAllCoursesFailture implements Action {
    readonly type = CourseActionTypes.LoadAllCoursesFailture;

    constructor(public payload: any) { }
}

export class EditCourse implements Action {
    readonly type = CourseActionTypes.LoadAllCourses;

    constructor(public payload: Course) { }
}

export class EditCourseSuccess implements Action {
    readonly type = CourseActionTypes.LoadAllCoursesSuccess;

    constructor(public payload: Course) { }
}

export class EditCourseFailture implements Action {
    readonly type = CourseActionTypes.LoadAllCoursesFailture;

    constructor(public payload: any) { } 
}

export class DeleteCourse implements Action {
    readonly type = CourseActionTypes.LoadAllCourses;

    constructor(public payload: number) { }
}

export class DeleteCourseSuccess implements Action {
    readonly type = CourseActionTypes.LoadAllCoursesSuccess;

    constructor(public payload: Course) { }
}

export class DeleteCourseFailture implements Action {
    readonly type = CourseActionTypes.LoadAllCoursesFailture;

    constructor(public payload: any) { } 
}

export type CourseActions =
    | LoadAllCourses
    | LoadAllCoursesSuccess
    | LoadAllCoursesFailture
    | EditCourse
    | EditCourseSuccess
    | EditCourseFailture
    | DeleteCourse
    | DeleteCourseSuccess
    | DeleteCourseFailture;
