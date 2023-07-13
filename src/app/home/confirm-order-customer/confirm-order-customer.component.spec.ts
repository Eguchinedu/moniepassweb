import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderCustomerComponent } from './confirm-order-customer.component';

describe('ConfirmOrderCustomerComponent', () => {
  let component: ConfirmOrderCustomerComponent;
  let fixture: ComponentFixture<ConfirmOrderCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmOrderCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmOrderCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
