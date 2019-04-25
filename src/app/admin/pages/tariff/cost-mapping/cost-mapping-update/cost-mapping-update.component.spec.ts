import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostMappingUpdateComponent } from './cost-mapping-update.component';

describe('CostMappingUpdateComponent', () => {
  let component: CostMappingUpdateComponent;
  let fixture: ComponentFixture<CostMappingUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostMappingUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostMappingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
