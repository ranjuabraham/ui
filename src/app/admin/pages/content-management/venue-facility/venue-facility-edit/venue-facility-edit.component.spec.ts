import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueFacilityEditComponent } from './venue-facility-edit.component';

describe('VenueFacilityEditComponent', () => {
  let component: VenueFacilityEditComponent;
  let fixture: ComponentFixture<VenueFacilityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueFacilityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueFacilityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
