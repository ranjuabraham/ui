import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffetMasterCreateComponent } from './buffet-master-create.component';

describe('BuffetMasterCreateComponent', () => {
  let component: BuffetMasterCreateComponent;
  let fixture: ComponentFixture<BuffetMasterCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffetMasterCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuffetMasterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
