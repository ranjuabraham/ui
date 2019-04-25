import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDetailsShowComponent } from './search-details-show.component';

describe('SearchDetailsShowComponent', () => {
  let component: SearchDetailsShowComponent;
  let fixture: ComponentFixture<SearchDetailsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDetailsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDetailsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
