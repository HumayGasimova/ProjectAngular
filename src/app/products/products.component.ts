import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  // products: Product[] = [];
  products = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
    this.populateProducts();
    
  }

  private populateProducts() {
    this.productService
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
      return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    })
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category) : 
    this.products;
    console.log(this.filteredProducts)
  }
}
