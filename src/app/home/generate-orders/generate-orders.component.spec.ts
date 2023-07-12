import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateOrdersComponent } from './generate-orders.component';

describe('GenerateOrdersComponent', () => {
  let component: GenerateOrdersComponent;
  let fixture: ComponentFixture<GenerateOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
