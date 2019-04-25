import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodeShowComponent } from './decode-show.component';

describe('DecodeShowComponent', () => {
  let component: DecodeShowComponent;
  let fixture: ComponentFixture<DecodeShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecodeShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecodeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
