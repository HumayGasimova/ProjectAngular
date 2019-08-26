import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    public http: HttpClient
  ) { }

  addProduct(product) {
    return this.http.post('https://projectangular-a927e.firebaseio.com/products.json', product);
  }
}
