import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidCreditsPage } from './paid-credits.page';

describe('PaidCreditsPage', () => {
  let component: PaidCreditsPage;
  let fixture: ComponentFixture<PaidCreditsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidCreditsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidCreditsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
