import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidDebtsPage } from './paid-debts.page';

describe('PaidDebtsPage', () => {
  let component: PaidDebtsPage;
  let fixture: ComponentFixture<PaidDebtsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidDebtsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidDebtsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
