import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailResponseComponent } from './order-detail-response.component';

describe('OrderDetailResponseComponent', () => {
  let component: OrderDetailResponseComponent;
  let fixture: ComponentFixture<OrderDetailResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
