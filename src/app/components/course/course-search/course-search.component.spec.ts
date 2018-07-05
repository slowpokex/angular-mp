import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSearchComponent } from './course-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CourseSearchComponent', () => {
  let component: CourseSearchComponent;
  let fixture: ComponentFixture<CourseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSearchComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
