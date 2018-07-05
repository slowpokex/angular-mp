import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePageComponent } from './course-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CourcePageComponent', () => {
  let component: CoursePageComponent;
  let fixture: ComponentFixture<CoursePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursePageComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
