import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallDetailsDialogComponent } from './hall-details-dialog.component';

describe('HallDetailsDialogComponent', () => {
  let component: HallDetailsDialogComponent;
  let fixture: ComponentFixture<HallDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
