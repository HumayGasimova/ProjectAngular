import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders$;
  userUid;
  subscription = Subscription;
  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { 
    authService.user$.subscribe(u => {
      
    this.userUid = u.uid;
    
    })
    this.orders$ = authService.user$
    .switchMap(u => {
      return orderService.getOrdersByUser(u.uid).valueChanges();
    });
    
    
   
  }

  ngOnInit() {
  }

}
