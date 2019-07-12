import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCreditorPage } from './single-creditor.page';

describe('SingleCreditorPage', () => {
  let component: SingleCreditorPage;
  let fixture: ComponentFixture<SingleCreditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCreditorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCreditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
