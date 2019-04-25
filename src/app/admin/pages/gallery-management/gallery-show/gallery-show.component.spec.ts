import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryShowComponent } from './gallery-show.component';

describe('GalleryShowComponent', () => {
  let component: GalleryShowComponent;
  let fixture: ComponentFixture<GalleryShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
