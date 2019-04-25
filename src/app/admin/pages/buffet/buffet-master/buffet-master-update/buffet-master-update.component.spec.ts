import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffetMasterUpdateComponent } from './buffet-master-update.component';

describe('BuffetMasterUpdateComponent', () => {
  let component: BuffetMasterUpdateComponent;
  let fixture: ComponentFixture<BuffetMasterUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffetMasterUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuffetMasterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
