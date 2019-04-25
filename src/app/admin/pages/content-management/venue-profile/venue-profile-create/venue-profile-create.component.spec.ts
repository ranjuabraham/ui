import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueProfileCreateComponent } from './venue-profile-create.component';

describe('VenueProfileCreateComponent', () => {
  let component: VenueProfileCreateComponent;
  let fixture: ComponentFixture<VenueProfileCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueProfileCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueProfileCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
