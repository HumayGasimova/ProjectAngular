import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    public http: HttpClient
  ) { }

  createCart() {
    return this.http.post('https://projectangular-a927e.firebaseio.com/shopping-carts.json', {
      dateCreated: new Date().getTime()
    })
  }

  getShoppingCarts() {
    return this.http.get('https://projectangular-a927e.firebaseio.com/shopping-carts.json');
  }

  private getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;
    
    this.createCart().subscribe(cart=> {
      let cartId;
        for(let key in cart){
         cartId = cart[key]
        }
        localStorage.setItem('cartId', cartId);
        console.log(cartId)
        return cartId;
      })
  }

  // getCart(cartId) {
  //   return this.http.get(`https://projectangular-a927e.firebaseio.com/shopping-carts/${cartId}.json`)
  // }

  addToCart(product) {
      this.updateItem(product, 1);
  }

  async updateItem(product, change) {
    let cartId = await this.getOrCreateCartId();
    let cart;
    this. getShoppingCarts().subscribe(cart=>{
      for(let key in cart){
        // cart=cart.items
      }
    })
    //   if(!cart.items){
       
    //   }else{
    //     console.log(cart)
    //     this.http.post(`https://projectangular-a927e.firebaseio.com/shopping-carts/${cartId}/items.json`, {
    //       title: product.data.title,
    //       imageUrl: product.data.imageUrl,
    //       price: product.data.price,
    //       quantity: change
    //     })
    //   }
    // })   
   
  }

  

}
