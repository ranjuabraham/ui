import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationCreateComponent } from './duration-create.component';

describe('DurationCreateComponent', () => {
  let component: DurationCreateComponent;
  let fixture: ComponentFixture<DurationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
