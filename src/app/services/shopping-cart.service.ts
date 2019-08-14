import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime()
    })
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

      // this.create().then(res => {
      //   localStorage.setItem('cartId', res.key);
      //   return this.getCart(res.key);
      // })
    
  }

  async addToCart(product: Product){
    let cartId = await this.getOrCreateCart();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);

    item$.snapshotChanges().take(1).subscribe((item) => {
      if(item.payload.exists()){
        // console.log(item.payload.val().quantity)
        item$.update({quantity: item.payload.val().quantity + 1});
      } 
      else item$.set({product: product, quantity: 1});
    })
  }
}
