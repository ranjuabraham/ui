import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniHallsComponent } from './mini-halls.component';

describe('MiniHallsComponent', () => {
  let component: MiniHallsComponent;
  let fixture: ComponentFixture<MiniHallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniHallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
