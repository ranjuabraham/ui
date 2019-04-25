import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostMappingShowComponent } from './cost-mapping-show.component';

describe('CostMappingShowComponent', () => {
  let component: CostMappingShowComponent;
  let fixture: ComponentFixture<CostMappingShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostMappingShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostMappingShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
