import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/firebase.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: any[];
  loading = true;

  constructor(private firebase: FirebaseService) {}

  itemsCount(order) {
    
    return order.items.items
      .map((item) => item.quantity)
      .reduce((acc, curr) => acc + curr, 0);
      
  }

  totalPrice(order) {
    return order.items.items
      .map((item) => item.quantity * item.unitPrice * item.priceMultiplier)
      .reduce((acc, curr) => acc + curr, 0);
  }

  private orderByDateDesc(orders: any[]) {
    return orders.sort((o1, o2) => Date.parse(o2.key) - Date.parse(o1.key));
  }

  ngOnInit(): void {
    this.firebase.getOrders().subscribe((value) => {
      this.orders = this.orderByDateDesc(value);
      this.loading = false;
      console.log(this.orders)
    });
  }
}
