import { Component, forwardRef, EventEmitter, Output, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseSearchComponent),
      multi: true
    }
  ]
})
export class CourseSearchComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private readonly searchDebouncer = new Subject<string>();
  private searchDebouncerSubscription;

  public value: string;
  public disabled = false;

  @Output()
  public searchChanged = new EventEmitter<string>();

  public onChange = (value: string) => {};
  public onTouched = (value: any) => {};

  constructor() {}

  ngOnInit(): void {
    this.searchDebouncerSubscription = this.searchDebouncer
      .pipe(debounceTime(250))
      .subscribe((value: string) => this.searchChanged.emit(value));
  }

  ngOnDestroy(): void {
    this.searchDebouncerSubscription.unsubscribe();
  }

  onSearch(event: Event): void {
    this.searchDebouncer.next(this.value);
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
