import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyHallsComponent } from './party-halls.component';

describe('PartyHallsComponent', () => {
  let component: PartyHallsComponent;
  let fixture: ComponentFixture<PartyHallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyHallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
