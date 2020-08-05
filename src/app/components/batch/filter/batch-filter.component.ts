import {Component} from '@angular/core';
import {BaseFormComponent} from '../../common/form/base-form.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ISelectItem, TranslationsHelper} from '../../../helpers/translations-helper';
import {BatchType} from '../../../enums/batch-type';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-batch-filter',
  templateUrl: './batch-filter.component.html',
  styleUrls: ['./batch-filter.component.scss']
})
export class BatchFilterComponent extends BaseFormComponent {
  batchOptions: Array<ISelectItem>;
  form: FormGroup;

  constructor(private fb: FormBuilder, ts: TranslocoService) {
    super();
    this.form = fb.group({
      isNotProcessed: fb.control(false),
      isPaused: fb.control(false),
      batchType: fb.control(null),
      dateFrom: fb.control(''),
      dateTo: fb.control(''),
    });

    ts.selectTranslateObject('enums.batchType').subscribe(enumObject => {
      this.batchOptions = TranslationsHelper.tEnum(enumObject, BatchType);
    });
  }

  submit() {
    this.submitForm(this.form.value);
  }
}
