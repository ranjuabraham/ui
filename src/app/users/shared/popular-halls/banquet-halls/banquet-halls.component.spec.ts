import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanquetHallsComponent } from './banquet-halls.component';

describe('BanquetHallsComponent', () => {
  let component: BanquetHallsComponent;
  let fixture: ComponentFixture<BanquetHallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanquetHallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanquetHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
