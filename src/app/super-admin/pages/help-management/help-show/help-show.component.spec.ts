import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpShowComponent } from './help-show.component';

describe('HelpShowComponent', () => {
  let component: HelpShowComponent;
  let fixture: ComponentFixture<HelpShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
