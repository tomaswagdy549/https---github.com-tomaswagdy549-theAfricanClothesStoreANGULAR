import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddedOrderDetails } from '../../models/DTOs/requestDTO/addedOrderDTO/addedOrderDTO/added-order-details';
import { OrderService } from '../../services/orderService/order.service';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.css',
})
export class ConfirmOrderComponent {
  orderDetails !: {
    addedOrderDetails:AddedOrderDetails[]
    coupon:string,
    gmail:string
  }
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.route.paramMap.subscribe((parms) => {
      try {
        this.orderDetails = JSON.parse(parms.get('orderDetails')!);
        console.log(this.orderDetails)
      } catch {
        console.log('Error parsing order details');
      }
    });
  }
  confirm() {
    console.log(this.orderDetails)
    this.orderService.confirmOrder(this.orderDetails).subscribe({});
  }
}
