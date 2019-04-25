import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaxCountCreateComponent } from './pax-count-create.component';

describe('PaxCountCreateComponent', () => {
  let component: PaxCountCreateComponent;
  let fixture: ComponentFixture<PaxCountCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaxCountCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaxCountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
