import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationHandlerComponent } from './configuration-handler.component';

describe('ConfigurationHandlerComponent', () => {
  let component: ConfigurationHandlerComponent;
  let fixture: ComponentFixture<ConfigurationHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
