import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffetMasterShowComponent } from './buffet-master-show.component';

describe('BuffetMasterShowComponent', () => {
  let component: BuffetMasterShowComponent;
  let fixture: ComponentFixture<BuffetMasterShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffetMasterShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuffetMasterShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
