import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

import {
  QualityControlParams, IConfigRecord, QualityCheck, IConfiguration,
  ManualColumns, AutomatColumns
} from '../../models/configuration.model';
import { BaseFormComponent } from '../common/form/base-form.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent extends BaseFormComponent implements OnInit, OnChanges {
  @Input() configuration: IConfiguration;
  @Input() onConfigurationChange: (configuration: IConfiguration) => void;
  @Input() initLoading: boolean;
  @Input() updateLoading: boolean;

  formGroup: FormGroup;

  manualColumns = ManualColumns;
  automatColumns = AutomatColumns;

  selectionManual = new SelectionModel<IConfigRecord>(true, []);
  selectionAutomat = new SelectionModel<IConfigRecord>(true, []);

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    if (!this.initLoading) { this.fillInForm(this.configuration.qualityCheck); }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('configuration' in changes) {
      if (!this.initLoading) { this.fillInForm(changes.configuration.currentValue.qualityCheck); }
    }
  }

  getVisibleManualColumns(): string[] {
    return [
      ManualColumns.selectionManual,
      ManualColumns.batchType,
      ManualColumns.batchActivity,
    ];
  }

  getVisibleAutomatColumns(): string[] {
    return [
      AutomatColumns.selectionManual,
      AutomatColumns.batchType,
      AutomatColumns.batchActivity,
    ];
  }

  fillInForm(qualityCheck: QualityCheck) {
    this.formGroup = this.fb.group({
      CK: this.fb.control(qualityCheck.akceptacniKriteria.CK, [Validators.min(0), Validators.max(100)]),
      N: this.fb.control(qualityCheck.akceptacniKriteria.N, [Validators.min(0), Validators.max(100)]),
      S: this.fb.control(qualityCheck.akceptacniKriteria.S, [Validators.min(0), Validators.max(100)]),
      V: this.fb.control(qualityCheck.akceptacniKriteria.V, [Validators.min(0), Validators.max(100)]),
      VV: this.fb.control(qualityCheck.akceptacniKriteria.VV, [Validators.min(0), Validators.max(100)]),
      testovaciKriterium: this.fb.control(qualityCheck.testovaciKriterium, [Validators.required, Validators.min(0)]),
      vzorekStranABVV: this.fb.control(qualityCheck.vzorekStranABVV, [Validators.min(0)]),
      vzorekStranOstatni: this.fb.control(qualityCheck.vzorekStranOstatni, [Validators.min(0)]),
      celyVzorek: this.fb.control(qualityCheck.celyVzorek),
    });
  }

  onSubmit(params: QualityControlParams) {
    const { autoStart, manualStart } = this.configuration;
    this.onConfigurationChange({
      autoStart, manualStart, qualityCheck: {
        akceptacniKriteria: {
          CK: params.CK,
          N: params.N,
          S: params.S,
          V: params.V,
          VV: params.VV
        },
        testovaciKriterium: params.testovaciKriterium,
        vzorekStranABVV: params.vzorekStranABVV,
        vzorekStranOstatni: params.vzorekStranOstatni,
        celyVzorek: params.celyVzorek
      }
    });
  }

  isAllManualSelected() {
    return this.selectionManual.selected.length === this.configuration.manualStart.length;
  }

  toggleManual(row: any) {
    this.selectionManual.isSelected(row) ?
      this.selectionManual.deselect(row) :
      this.selectionManual.select(row);
  }

  toggleAllManual() {
    this.isAllManualSelected() ?
      this.selectionManual.clear() :
      this.configuration.manualStart.forEach(row => this.selectionManual.select(row));
  }

  isAllAutomatSelected() {
    return this.selectionAutomat.selected.length === this.configuration.autoStart.length;
  }

  toggleAutomat(row: any) {
    this.selectionAutomat.isSelected(row) ?
      this.selectionAutomat.deselect(row) :
      this.selectionAutomat.select(row);
  }

  toggleAllAutomat() {
    this.isAllAutomatSelected() ?
      this.selectionAutomat.clear() :
      this.configuration.autoStart.forEach(row => this.selectionAutomat.select(row));
  }

  moveSelectedAutomatToManual() {
    this.swapTableRecords(this.selectionAutomat, this.configuration.autoStart, AutomatColumns.selectionManual);
  }

  moveSelectedManualToAutomat() {
    this.swapTableRecords(this.selectionManual, this.configuration.manualStart, ManualColumns.selectionManual);
  }

  swapTableRecords(selection, source, selectionColumn) {
    if (selection.selected.length === 0) { return; }

    const newSourceArray: IConfigRecord[] = [];
    const newTargetArray: IConfigRecord[] = [];
    source.forEach(record => {
      if (selection.selected.indexOf(record) < 0) {
        newSourceArray.push(record);
      } else {
        newTargetArray.push(record);
      }
    });

    let configuration: IConfiguration;
    if (selectionColumn === AutomatColumns.selectionManual) {
      configuration = {
        autoStart: newSourceArray,
        manualStart: [...this.configuration.manualStart, ...newTargetArray],
        qualityCheck: this.configuration.qualityCheck
      };
    } else {
      configuration = {
        autoStart: [...this.configuration.autoStart, ...newTargetArray],
        manualStart: newSourceArray,
        qualityCheck: this.configuration.qualityCheck
      };
    }

    selection.clear();
    this.onConfigurationChange(configuration);
  }
}
