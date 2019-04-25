import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaxCountShowComponent } from './pax-count-show.component';

describe('PaxCountShowComponent', () => {
  let component: PaxCountShowComponent;
  let fixture: ComponentFixture<PaxCountShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaxCountShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaxCountShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
