import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffetItemsCreateComponent } from './buffet-items-create.component';

describe('BuffetItemsCreateComponent', () => {
  let component: BuffetItemsCreateComponent;
  let fixture: ComponentFixture<BuffetItemsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffetItemsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuffetItemsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
