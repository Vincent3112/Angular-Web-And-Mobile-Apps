import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDebtPage } from './single-debt.page';

describe('SingleDebtPage', () => {
  let component: SingleDebtPage;
  let fixture: ComponentFixture<SingleDebtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDebtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDebtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
