import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsShowComponent } from './contact-us-show.component';

describe('ContactUsShowComponent', () => {
  let component: ContactUsShowComponent;
  let fixture: ComponentFixture<ContactUsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
