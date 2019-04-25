import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDetailsEditComponent } from './search-details-edit.component';

describe('SearchDetailsEditComponent', () => {
  let component: SearchDetailsEditComponent;
  let fixture: ComponentFixture<SearchDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
