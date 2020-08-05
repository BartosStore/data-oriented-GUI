import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlStateDialogComponent } from './control-state-dialog.component';

describe('ControlStateDialogComponent', () => {
  let component: ControlStateDialogComponent;
  let fixture: ComponentFixture<ControlStateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlStateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlStateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
