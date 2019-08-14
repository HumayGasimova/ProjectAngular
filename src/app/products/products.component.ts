import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  // products: Product[] = [];
  products;
  filteredProducts: Product[] = [];
  category: string;

  constructor(
    productService: ProductService,
    route: ActivatedRoute
  ) { 
    productService
      .getAll()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c =>{
         return ({ key: c.payload.key, ...c.payload.val()})
        }
        );
      })
      .switchMap(products => {
        this.products = products;
        // console.log(this.products.key)
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        
        this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.category === this.category) : 
          this.products;
          console.log(this.filteredProducts)
      })



      // productService
      // .getAll()
      // .valueChanges()
      // .switchMap(products => {
      //   this.products = products;
      //   console.log(this.products)
      //   return route.queryParamMap;
      // })
      // .subscribe(params => {
      //   this.category = params.get('category');
        
      //   this.filteredProducts = (this.category) ? 
      //     this.products.filter(p => p.category === this.category) : 
      //     this.products;
      //     console.log(this.filteredProducts)
      // })

      

  }


}
