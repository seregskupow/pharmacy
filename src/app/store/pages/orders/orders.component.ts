import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: any = [];
  loading = true;
  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService.getOrder().subscribe((orders) => {
      this.orders = orders;
      this.loading = false;
      console.log({ orders });
    });
  }
}
