import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCreditorPage } from './new-creditor.page';

describe('NewCreditorPage', () => {
  let component: NewCreditorPage;
  let fixture: ComponentFixture<NewCreditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCreditorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCreditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
