import { Component, OnInit, forwardRef, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseSearchComponent),
      multi: true
    }
  ]
})
export class CourseSearchComponent implements ControlValueAccessor {

  public value: string;
  public disabled = false;

  @Output()
  public searchChanged = new EventEmitter<string>();

  public onChange = (value: string) => {};
  public onTouched = (value: any) => {};

  constructor() { }

  onSearch(event: Event): void {
    this.searchChanged.emit(this.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
