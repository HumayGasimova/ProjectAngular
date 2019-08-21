import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'app/shared/models/shopping-cart';
import { OrderService } from 'app/shared/services/order.service';
import { AuthService } from 'app/shared/services/auth.service';
import { Order } from 'app/shared/models/order';
@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: any = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
   this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(){
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/orderSuccess', result.key]);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
 
}
