import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDebtPage } from './new-debt.page';

describe('NewDebtPage', () => {
  let component: NewDebtPage;
  let fixture: ComponentFixture<NewDebtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDebtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDebtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
