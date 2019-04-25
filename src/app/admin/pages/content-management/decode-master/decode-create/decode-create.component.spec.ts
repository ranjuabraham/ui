import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodeCreateComponent } from './decode-create.component';

describe('DecodeCreateComponent', () => {
  let component: DecodeCreateComponent;
  let fixture: ComponentFixture<DecodeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecodeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
