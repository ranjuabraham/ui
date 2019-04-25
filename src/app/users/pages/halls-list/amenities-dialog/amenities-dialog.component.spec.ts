import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitiesDialogComponent } from './amenities-dialog.component';

describe('AmenitiesDialogComponent', () => {
  let component: AmenitiesDialogComponent;
  let fixture: ComponentFixture<AmenitiesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenitiesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenitiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
