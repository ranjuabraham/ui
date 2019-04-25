import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeableAmenitiesDialogComponent } from './chargeable-amenities-dialog.component';

describe('ChargeableAmenitiesDialogComponent', () => {
  let component: ChargeableAmenitiesDialogComponent;
  let fixture: ComponentFixture<ChargeableAmenitiesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeableAmenitiesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeableAmenitiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
