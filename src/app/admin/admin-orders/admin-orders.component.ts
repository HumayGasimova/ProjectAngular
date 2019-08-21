import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'app/shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnDestroy {
orders;
subscription: Subscription;
  constructor(
    private orderService: OrderService
  ) { 
    this.subscription = orderService.getOrders()
    .snapshotChanges()
    .map(changes => {
      return changes.map(c =>{
       return ({ key: c.payload.key, ...c.payload.val()})
      }
      );
    })
    .subscribe(orders => this.orders = orders);
  }

  ngOnDestroy() {
   this.subscription.unsubscribe();
  }

}
