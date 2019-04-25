import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueDetailsDialogComponent } from './venue-details-dialog.component';

describe('VenueDetailsDialogComponent', () => {
  let component: VenueDetailsDialogComponent;
  let fixture: ComponentFixture<VenueDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
