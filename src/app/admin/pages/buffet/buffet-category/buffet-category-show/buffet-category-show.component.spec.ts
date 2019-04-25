import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffetCategoryShowComponent } from './buffet-category-show.component';

describe('BuffetCategoryShowComponent', () => {
  let component: BuffetCategoryShowComponent;
  let fixture: ComponentFixture<BuffetCategoryShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffetCategoryShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuffetCategoryShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
