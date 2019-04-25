import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineTransactionUpdateComponent } from './online-transaction-update.component';

describe('OnlineTransactionUpdateComponent', () => {
  let component: OnlineTransactionUpdateComponent;
  let fixture: ComponentFixture<OnlineTransactionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineTransactionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineTransactionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
