import { Component, forwardRef } from '@angular/core';
import { 
    ControlValueAccessor,
    Validator,
    AbstractControl,
    ValidationErrors,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS
} from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'app-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DateInputComponent),
          multi: true,
        },
        {
          provide: NG_VALIDATORS,
          useExisting: forwardRef(() => DateInputComponent),
          multi: true,
        }] 
})
export class DateInputComponent implements ControlValueAccessor, Validator {
    readonly dateValidationToken = /^(?!(?![02468][048]|[13579][26]00)..(?!(?!00)[02468][048]|[13579][26])...02.29)\d{4}([\/-])(?=0.|1[012])(?!(0[13578]|1[02]).31|02.3)\d\d\1[012]|3[01]$/
    _value = '';
    _disabled = false;
    _onChange = (value: Date) => {};
    _onTouched = (value: Date) => {};
    _onChangeValidation = () => {};

    onChange(date: string): void {
        const value = moment(date, 'DD-MM-YYYY');
        if (value.isValid()) {
            this._onChange(value.toDate())
        }        
        this._onChangeValidation();
    }

    writeValue(obj: Date): void {
        this._value = moment(obj).format('DD/MM/YYYY');
        this._onChangeValidation();
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this._disabled = isDisabled;
    }

    validate(c: AbstractControl): ValidationErrors {
        return !moment(c.value, 'DD-MM-YYYY').isValid()
            ? { incorrectDate: true } 
            : null;
    }

    registerOnValidatorChange?(fn: () => void): void {
        this._onChangeValidation = fn;
    }
}