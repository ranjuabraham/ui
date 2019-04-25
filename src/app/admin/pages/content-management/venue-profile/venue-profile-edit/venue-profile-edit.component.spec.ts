import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueProfileEditComponent } from './venue-profile-edit.component';

describe('VenueProfileEditComponent', () => {
  let component: VenueProfileEditComponent;
  let fixture: ComponentFixture<VenueProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
