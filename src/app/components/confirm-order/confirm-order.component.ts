import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private orderService: OrderService
  ) {
    this.route.paramMap.subscribe((parms) => {
      try {
        this.orderDetails = JSON.parse(parms.get('orderDetails')!);
      } catch {
      }
    });
  }
  confirm() {
    this.orderService.confirmOrder(this.orderDetails).subscribe({});
    this.router.navigateByUrl('/')
  }
}
