import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitiesCreateComponent } from './amenities-create.component';

describe('AmenitiesCreateComponent', () => {
  let component: AmenitiesCreateComponent;
  let fixture: ComponentFixture<AmenitiesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenitiesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenitiesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
