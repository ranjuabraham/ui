import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostMappingCreateComponent } from './cost-mapping-create.component';

describe('CostMappingCreateComponent', () => {
  let component: CostMappingCreateComponent;
  let fixture: ComponentFixture<CostMappingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostMappingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostMappingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
