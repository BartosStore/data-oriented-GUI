import {AbstractControl, FormGroup} from '@angular/forms';
import {Component, Input} from '@angular/core';

@Component({
  template: ''
})
export abstract class BaseFormComponent {
  @Input() submitForm: (values: object) => void;

  hasError(group: FormGroup, key: string) {
    const control: AbstractControl = group.get(key);

    return control.invalid && (control.dirty || control.touched) && Object.values(control.errors).length;
  }

  getFirstError(group: FormGroup, key: string) {
    if (!this.hasError(group, key)) {
      return '';
    }
    const control: AbstractControl = group.get(key);

    return `rules.${Object.keys(control.errors)[0]}`;
  }

  isValid(group: FormGroup): boolean {
    return group.status === 'VALID';
  }
}
