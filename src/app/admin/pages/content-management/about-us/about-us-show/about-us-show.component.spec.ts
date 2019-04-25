import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsShowComponent } from './about-us-show.component';

describe('AboutUsShowComponent', () => {
  let component: AboutUsShowComponent;
  let fixture: ComponentFixture<AboutUsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutUsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
