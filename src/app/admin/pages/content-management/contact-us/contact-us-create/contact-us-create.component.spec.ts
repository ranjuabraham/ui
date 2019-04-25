import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsCreateComponent } from './contact-us-create.component';

describe('ContactUsCreateComponent', () => {
  let component: ContactUsCreateComponent;
  let fixture: ComponentFixture<ContactUsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
