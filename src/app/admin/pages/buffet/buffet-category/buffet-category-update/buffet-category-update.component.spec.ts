import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffetCategoryUpdateComponent } from './buffet-category-update.component';

describe('BuffetCategoryUpdateComponent', () => {
  let component: BuffetCategoryUpdateComponent;
  let fixture: ComponentFixture<BuffetCategoryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffetCategoryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuffetCategoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
