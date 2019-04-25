import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecodeEditComponent } from './decode-edit.component';

describe('DecodeEditComponent', () => {
  let component: DecodeEditComponent;
  let fixture: ComponentFixture<DecodeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecodeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
