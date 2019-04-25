import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTypeShowComponent } from './food-type-show.component';

describe('FoodTypeShowComponent', () => {
  let component: FoodTypeShowComponent;
  let fixture: ComponentFixture<FoodTypeShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodTypeShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTypeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
