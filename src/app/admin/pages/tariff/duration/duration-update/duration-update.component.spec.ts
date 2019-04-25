import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationUpdateComponent } from './duration-update.component';

describe('DurationUpdateComponent', () => {
  let component: DurationUpdateComponent;
  let fixture: ComponentFixture<DurationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
