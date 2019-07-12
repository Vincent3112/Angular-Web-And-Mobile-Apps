import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditorsPage } from './creditors.page';

describe('CreditorsPage', () => {
  let component: CreditorsPage;
  let fixture: ComponentFixture<CreditorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditorsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
