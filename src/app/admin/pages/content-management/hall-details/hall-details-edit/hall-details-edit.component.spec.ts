import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallDetailsEditComponent } from './hall-details-edit.component';

describe('HallDetailsEditComponent', () => {
  let component: HallDetailsEditComponent;
  let fixture: ComponentFixture<HallDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
