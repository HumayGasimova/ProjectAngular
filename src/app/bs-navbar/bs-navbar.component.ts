import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'app/shared/models/shopping-cart';
import { AppUser } from 'app/shared/models/app-user';
import { AuthService } from 'app/shared/services/auth.service';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
  // shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  logout(){
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();

    // cart$.subscribe(cart => {
    //   this.shoppingCartItemCount = 0;
    //   for(let productId in cart.items){
    //     this.shoppingCartItemCount += cart.items[productId].quantity;
    //   }
    // });
  }
}
