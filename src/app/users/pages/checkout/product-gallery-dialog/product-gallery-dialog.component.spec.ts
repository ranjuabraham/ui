import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGalleryDialogComponent } from './product-gallery-dialog.component';

describe('ProductGalleryDialogComponent', () => {
  let component: ProductGalleryDialogComponent;
  let fixture: ComponentFixture<ProductGalleryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGalleryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGalleryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
