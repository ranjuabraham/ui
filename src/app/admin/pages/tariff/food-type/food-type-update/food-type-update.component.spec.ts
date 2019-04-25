import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTypeUpdateComponent } from './food-type-update.component';

describe('FoodTypeUpdateComponent', () => {
  let component: FoodTypeUpdateComponent;
  let fixture: ComponentFixture<FoodTypeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodTypeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
