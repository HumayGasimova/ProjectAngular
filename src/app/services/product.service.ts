import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  create(product){
    return this.db.list('/product').push(product);
  }

  getAll() {
    return this.db.list('/product').valueChanges()
  }

  getProduct(productId) {
    return this.db.object('/product/'+ productId).valueChanges();
  }

  update(productId, product){
    return this.db.object('/product/' + productId).update(product);
  }
}
