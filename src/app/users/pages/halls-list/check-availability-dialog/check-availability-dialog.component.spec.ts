import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAvailabilityDialogComponent } from './check-availability-dialog.component';

describe('CheckAvailabilityDialogComponent', () => {
  let component: CheckAvailabilityDialogComponent;
  let fixture: ComponentFixture<CheckAvailabilityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAvailabilityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAvailabilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
