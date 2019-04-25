import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountShowComponent } from './discount-show.component';

describe('DiscountShowComponent', () => {
  let component: DiscountShowComponent;
  let fixture: ComponentFixture<DiscountShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
