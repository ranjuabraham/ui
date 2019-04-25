import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueShowComponent } from './venue-show.component';

describe('VenueShowComponent', () => {
  let component: VenueShowComponent;
  let fixture: ComponentFixture<VenueShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
