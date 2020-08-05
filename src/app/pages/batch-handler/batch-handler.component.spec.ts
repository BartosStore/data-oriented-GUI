import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchHandlerComponent } from './batch-handler.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BatchService } from '../../services/batch/batch.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('BatchHandlerComponent', () => {
  let component: BatchHandlerComponent;
  let fixture: ComponentFixture<BatchHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [BatchHandlerComponent],
      providers: [BatchService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
