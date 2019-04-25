import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageHallsComponent } from './marriage-halls.component';

describe('MarriageHallsComponent', () => {
  let component: MarriageHallsComponent;
  let fixture: ComponentFixture<MarriageHallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageHallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
