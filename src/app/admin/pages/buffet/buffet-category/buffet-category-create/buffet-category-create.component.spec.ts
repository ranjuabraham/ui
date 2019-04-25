import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffetCategoryCreateComponent } from './buffet-category-create.component';

describe('BuffetCategoryCreateComponent', () => {
  let component: BuffetCategoryCreateComponent;
  let fixture: ComponentFixture<BuffetCategoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffetCategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuffetCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
