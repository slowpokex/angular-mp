import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import {
    CourseActionTypes,
    LoadAllCourses,
    LoadAllCoursesSuccess,
    LoadAllCoursesFailture
} from '../actions/course';
import { CoursesService } from '../courses.service';
import { Course } from '../../../models/course';

@Injectable()
export class CourseEffects {
    @Effect()
    loadCourses$ = this.actions$.pipe(
        ofType(CourseActionTypes.LoadAllCourses),
        map((action: LoadAllCourses) => action.payload),
        exhaustMap((...data) => this.courseService.getAllCourses(...data).pipe(
            map((courses: Array<Course>) => new LoadAllCoursesSuccess(courses)),
            catchError(error => of(new LoadAllCoursesFailture(error)))
        ))
    );

    @Effect({ dispatch: false })
    loadCoursesSuccess$ = this.actions$.pipe(
        ofType(CourseActionTypes.LoadAllCoursesSuccess),
        tap((courses: Array<Course>) => {
            // Some modify before send to FE
            // this.router.navigate(['/login']);
        })
    );

    @Effect({ dispatch: false })
    loadCoursesFailture$ = this.actions$.pipe(
        ofType(CourseActionTypes.LoadAllCoursesFailture),
        tap((error: any) => {
            // Some error handling
            // this.router.navigate(['/login']);
        })
    );

    constructor(
        private actions$: Actions,
        private courseService: CoursesService,
        private router: Router
    ) {}
}