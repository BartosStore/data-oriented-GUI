import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {IBatch} from 'src/app/models/batch.model';
import {BatchService} from 'src/app/services/batch/batch.service';

@Component({
  selector: 'app-control-state-dialog',
  templateUrl: './control-state-dialog.component.html',
})
export class ControlStateDialogComponent implements OnInit {
  batch: IBatch;

  constructor(
    public dialogRef: MatDialogRef<ControlStateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBatch,
    private service: BatchService
  ) {
  }

  ngOnInit(): void {
    this.service.fetchBatchDetail(this.data.id, this.data.typ).subscribe(batch => this.batch = batch);
  }

  evaluateDuvodZmenyStavu(): string {
    if (this.batch && this.batch.duvodZmenyStavu) {
      return this.batch.duvodZmenyStavu;
    } else {
      // todo: dev - display placeholder for empty string
      return '{"userId": 1,"id": 1,"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit","body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"}';
    }
  }

  onClick(): void {
    this.dialogRef.close();
  }
}
