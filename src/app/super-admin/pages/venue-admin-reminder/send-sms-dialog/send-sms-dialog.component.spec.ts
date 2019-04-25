import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSmsDialogComponent } from './send-sms-dialog.component';

describe('SendSmsDialogComponent', () => {
  let component: SendSmsDialogComponent;
  let fixture: ComponentFixture<SendSmsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendSmsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSmsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
