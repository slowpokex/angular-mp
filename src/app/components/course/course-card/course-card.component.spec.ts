import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardComponent } from './course-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { Course } from '../../../models/course';
import { By } from '@angular/platform-browser';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  // Test mock object
  const course: Course = {
    id: 42,
    title: 'Test title',
    creationDate: new Date(42),
    duration: 127,
    description: 'Test description',
    photoUrl: 'http://lolkek.by',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCardComponent ],
      imports: [
        HttpClientModule,
        MatIconModule
      ],
      providers: [
        MatIconRegistry
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;

    spyOn(component.editClick, 'emit');
    spyOn(component.deleteClick, 'emit');

    component.card = { ...course };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log('The component creating are correct');
  });

  it('should call icon registry', () => {

  });

  it('should have correct input', () => {
    expect(component.card.id).toEqual(course.id);
    expect(component.card.title).toEqual(course.title);
    expect(component.card.creationDate).toEqual(course.creationDate);
    expect(component.card.duration).toEqual(course.duration);
    expect(component.card.description).toEqual(course.description);
    expect(component.card.photoUrl).toEqual(course.photoUrl);
    console.log('The all inputs are correct');
  });

  it('should click edit', () => {
    const clonedCard = { ...course };
    const editButton = fixture.debugElement.query(By.css('.edit'));
    editButton.triggerEventHandler('click', clonedCard);
    expect(component.editClick.emit).toHaveBeenCalledWith(clonedCard);
    expect(component.deleteClick.emit).not.toHaveBeenCalled();
    console.log('The component edit click is correct');
  });

  it('should click delete', () => {
    const clonedCard = { ...course };
    const editButton = fixture.debugElement.query(By.css('.delete'));
    editButton.triggerEventHandler('click', clonedCard);
    expect(component.editClick.emit).not.toHaveBeenCalled();
    expect(component.deleteClick.emit).toHaveBeenCalledWith(clonedCard);
    console.log('The component delete click is correct');
  });
});
