import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaxCountUpdateComponent } from './pax-count-update.component';

describe('PaxCountUpdateComponent', () => {
  let component: PaxCountUpdateComponent;
  let fixture: ComponentFixture<PaxCountUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaxCountUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaxCountUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
