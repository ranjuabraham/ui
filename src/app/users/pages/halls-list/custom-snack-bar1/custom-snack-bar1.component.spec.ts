import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSnackBar1Component } from './custom-snack-bar1.component';

describe('CustomSnackBar1Component', () => {
  let component: CustomSnackBar1Component;
  let fixture: ComponentFixture<CustomSnackBar1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSnackBar1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSnackBar1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
