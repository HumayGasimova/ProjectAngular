import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from 'app/models/shopping-cart';
import { Observable } from 'rxjs';
import { Product } from 'app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private db: AngularFireDatabase,
    public http: HttpClient
  ) { }

  async getCart(){
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

  // private create() {
  //   return this.db.list('/shopping-carts').push({
  //     dataCreated: new Date().getTime()
  //   })
  // }
  private create() {
    return this.http.post('https://projectangular-a927e.firebaseio.com/shopping-carts.json', {
      dateCreated: new Date().getTime()
    })
  }

  private getItem(cartId: string, productId: string): any{
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;
    
    this.create().subscribe(cart=> {
      let cartId;
        for(let key in cart){
         cartId = cart[key]
        }
        localStorage.setItem('cartId', cartId);
        return cartId;
      })
    
  }

  private async updateItem(product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);

    item$
    .snapshotChanges()
    .take(1)
    .subscribe((item) => {
      // console.log(item)
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
          title: product.data.title,
          imageUrl: product.data.imageUrl,
          price: product.data.price,
          quantity: change
        });
    
    })
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  

}
