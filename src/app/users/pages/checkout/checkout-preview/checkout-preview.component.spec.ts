import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPreviewComponent } from './checkout-preview.component';

describe('CheckoutPreviewComponent', () => {
  let component: CheckoutPreviewComponent;
  let fixture: ComponentFixture<CheckoutPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
