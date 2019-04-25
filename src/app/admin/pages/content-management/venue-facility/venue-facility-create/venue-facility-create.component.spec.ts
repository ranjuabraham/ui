import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueFacilityCreateComponent } from './venue-facility-create.component';

describe('VenueFacilityCreateComponent', () => {
  let component: VenueFacilityCreateComponent;
  let fixture: ComponentFixture<VenueFacilityCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueFacilityCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueFacilityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
