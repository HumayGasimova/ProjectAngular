import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ignoreElements } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent{
@Input('product') product: Product;
@Input('show-actions') showActions = true;
@Input('shopping-cart') shoppingCart;

  constructor(
    private cartService: ShoppingCartService
  ) { }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    // console.log(product.key)
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;

  }
}
