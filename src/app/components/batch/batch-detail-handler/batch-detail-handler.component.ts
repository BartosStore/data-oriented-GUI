import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BatchService} from '../../../services/batch/batch.service';
import {BatchType} from '../../../enums/batch-type';
import {IBatch} from '../../../models/batch.model';

@Component({
  selector: 'app-batch-detail-handler',
  templateUrl: './batch-detail-handler.component.html',
})
export class BatchDetailHandlerComponent implements OnInit {
  batch: IBatch;
  id: string;
  type: string;
  loading: boolean;

  constructor(private route: ActivatedRoute, private service: BatchService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.queryParamMap.get('type');

    this.loading = true;
    this.service.fetchBatchDetail(parseInt(this.id, 10), this.type as BatchType).subscribe(batch => {
      this.batch = batch;
    }).add(() => {
      this.loading = false;
    });
  }
}
