import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {IBatch} from 'src/app/models/batch.model';

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
})
export class BatchDetailComponent implements OnInit {
  @Input() batch: IBatch;
  @Input() loading: boolean;

  constructor(private location: Location) {
  }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }
}
