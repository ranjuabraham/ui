import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTypeCreateComponent } from './food-type-create.component';

describe('FoodTypeCreateComponent', () => {
  let component: FoodTypeCreateComponent;
  let fixture: ComponentFixture<FoodTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
