import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VenueFacilityShowComponent } from './venue-facility-show.component';

describe('VenueFacilityShowComponent', () => {
  let component: VenueFacilityShowComponent;
  let fixture: ComponentFixture<VenueFacilityShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueFacilityShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueFacilityShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
