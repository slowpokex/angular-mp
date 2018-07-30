import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormPageComponent } from './course-form-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CourseAddComponent', () => {
  let component: CourseFormPageComponent;
  let fixture: ComponentFixture<CourseFormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFormPageComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
