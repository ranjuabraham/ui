import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallDetailsShowComponent } from './hall-details-show.component';

describe('HallDetailsShowComponent', () => {
  let component: HallDetailsShowComponent;
  let fixture: ComponentFixture<HallDetailsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallDetailsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallDetailsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
