import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueDetailsShowComponent } from './venue-details-show.component';

describe('VenueDetailsShowComponent', () => {
  let component: VenueDetailsShowComponent;
  let fixture: ComponentFixture<VenueDetailsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueDetailsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueDetailsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
