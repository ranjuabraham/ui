import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDetailsCreateComponent } from './search-details-create.component';

describe('SearchDetailsCreateComponent', () => {
  let component: SearchDetailsCreateComponent;
  let fixture: ComponentFixture<SearchDetailsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDetailsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
