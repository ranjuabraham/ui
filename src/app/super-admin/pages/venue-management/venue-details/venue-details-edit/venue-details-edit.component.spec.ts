import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueDetailsEditComponent } from './venue-details-edit.component';

describe('VenueDetailsEditComponent', () => {
  let component: VenueDetailsEditComponent;
  let fixture: ComponentFixture<VenueDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
