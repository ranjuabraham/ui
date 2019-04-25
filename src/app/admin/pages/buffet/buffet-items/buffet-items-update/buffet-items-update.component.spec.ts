import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffetItemsUpdateComponent } from './buffet-items-update.component';

describe('BuffetItemsUpdateComponent', () => {
  let component: BuffetItemsUpdateComponent;
  let fixture: ComponentFixture<BuffetItemsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffetItemsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuffetItemsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
