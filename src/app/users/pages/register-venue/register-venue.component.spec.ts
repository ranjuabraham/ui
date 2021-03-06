import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVenueComponent } from './register-venue.component';

describe('RegisterVenueComponent', () => {
  let component: RegisterVenueComponent;
  let fixture: ComponentFixture<RegisterVenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterVenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
