import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickBlockComponent } from './quick-block.component';

describe('QuickBlockComponent', () => {
  let component: QuickBlockComponent;
  let fixture: ComponentFixture<QuickBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
