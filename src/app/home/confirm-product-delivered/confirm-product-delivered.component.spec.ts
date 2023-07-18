import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmProductDeliveredComponent } from './confirm-product-delivered.component';

describe('ConfirmProductDeliveredComponent', () => {
  let component: ConfirmProductDeliveredComponent;
  let fixture: ComponentFixture<ConfirmProductDeliveredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmProductDeliveredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmProductDeliveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
