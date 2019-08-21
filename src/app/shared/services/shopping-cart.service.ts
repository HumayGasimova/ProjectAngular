import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
    .map((x)=> {
      var data = JSON.parse(JSON.stringify(x));
      // console.log("fdf", data)
      return new ShoppingCart(data.items)
    })
  }
  
  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dataCreated: new Date().getTime()
    })
  }
  private getItem(cartId: string, productId: string): any{
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
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

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$
    .snapshotChanges()
    .take(1)
    .subscribe((item) => {
        if(item.payload.exists()){
          let quantity = (item.payload.val().quantity || 0) + change;
          if(quantity === 0){
            item$.remove();
          } else{
            // console.log(item.payload.val().quantity)
            item$.update({
              quantity: quantity
            });
          }
        } 
        else item$.set({
          // product: product, 
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: change
        });
    
    })
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
}
