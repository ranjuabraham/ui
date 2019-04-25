import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueDetailsCreateComponent } from './venue-details-create.component';

describe('VenueDetailsCreateComponent', () => {
  let component: VenueDetailsCreateComponent;
  let fixture: ComponentFixture<VenueDetailsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueDetailsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
