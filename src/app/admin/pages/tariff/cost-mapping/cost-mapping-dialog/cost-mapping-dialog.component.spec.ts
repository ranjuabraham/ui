import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostMappingDialogComponent } from './cost-mapping-dialog.component';

describe('CostMappingDialogComponent', () => {
  let component: CostMappingDialogComponent;
  let fixture: ComponentFixture<CostMappingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostMappingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostMappingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
