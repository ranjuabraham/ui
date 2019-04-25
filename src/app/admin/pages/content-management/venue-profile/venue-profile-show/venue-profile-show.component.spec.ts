import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueProfileShowComponent } from './venue-profile-show.component';

describe('VenueProfileShowComponent', () => {
  let component: VenueProfileShowComponent;
  let fixture: ComponentFixture<VenueProfileShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueProfileShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueProfileShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
