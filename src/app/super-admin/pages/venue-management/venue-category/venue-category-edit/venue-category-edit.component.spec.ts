import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueCategoryEditComponent } from './venue-category-edit.component';

describe('VenueCategoryEditComponent', () => {
  let component: VenueCategoryEditComponent;
  let fixture: ComponentFixture<VenueCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
