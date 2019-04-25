import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueCategoryCreateComponent } from './venue-category-create.component';

describe('VenueCategoryCreateComponent', () => {
  let component: VenueCategoryCreateComponent;
  let fixture: ComponentFixture<VenueCategoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueCategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
