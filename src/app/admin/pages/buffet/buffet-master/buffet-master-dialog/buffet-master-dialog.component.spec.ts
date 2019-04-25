import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffetMasterDialogComponent } from './buffet-master-dialog.component';

describe('BuffetMasterDialogComponent', () => {
  let component: BuffetMasterDialogComponent;
  let fixture: ComponentFixture<BuffetMasterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffetMasterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuffetMasterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
