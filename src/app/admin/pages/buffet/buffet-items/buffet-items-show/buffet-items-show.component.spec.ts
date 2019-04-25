import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffetItemsShowComponent } from './buffet-items-show.component';

describe('BuffetItemsShowComponent', () => {
  let component: BuffetItemsShowComponent;
  let fixture: ComponentFixture<BuffetItemsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffetItemsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuffetItemsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
