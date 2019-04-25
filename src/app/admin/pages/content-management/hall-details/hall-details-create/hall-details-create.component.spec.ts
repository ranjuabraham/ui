import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallDetailsCreateComponent } from './hall-details-create.component';

describe('HallDetailsCreateComponent', () => {
  let component: HallDetailsCreateComponent;
  let fixture: ComponentFixture<HallDetailsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallDetailsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
