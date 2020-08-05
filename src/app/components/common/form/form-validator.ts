import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

export class FormValidator {
  public static optional(validator: ValidatorFn) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        return validator(control);
      }

      return null;
    };
  }
}
