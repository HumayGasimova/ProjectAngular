import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Subscription } from 'rxjs';

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
