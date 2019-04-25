import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodMenuEditComponent } from './food-menu-edit.component';

describe('FoodMenuEditComponent', () => {
  let component: FoodMenuEditComponent;
  let fixture: ComponentFixture<FoodMenuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodMenuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodMenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
