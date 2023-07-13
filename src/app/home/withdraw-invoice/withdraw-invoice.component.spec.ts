import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawInvoiceComponent } from './withdraw-invoice.component';

describe('WithdrawInvoiceComponent', () => {
  let component: WithdrawInvoiceComponent;
  let fixture: ComponentFixture<WithdrawInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
