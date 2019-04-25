import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitiesShowComponent } from './amenities-show.component';

describe('AmenitiesShowComponent', () => {
  let component: AmenitiesShowComponent;
  let fixture: ComponentFixture<AmenitiesShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenitiesShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenitiesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
