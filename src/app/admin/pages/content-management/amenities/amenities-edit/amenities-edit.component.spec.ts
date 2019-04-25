import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitiesEditComponent } from './amenities-edit.component';

describe('AmenitiesEditComponent', () => {
  let component: AmenitiesEditComponent;
  let fixture: ComponentFixture<AmenitiesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenitiesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenitiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
