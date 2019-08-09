import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [];
  categories$;
  filteredProducts: Product[] = [];
  category: string;

  constructor(
    productService: ProductService,
    categoryService: CategoryService,
    route: ActivatedRoute
  ) { 
      productService
      .getAll()
      .valueChanges()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.category === this.category) : 
          this.products;
      })

      this.categories$ = categoryService.getCategories().snapshotChanges()
      .map(changes => {
        return changes.map(c =>{
        return ({ key: c.payload.key, ...c.payload.val()})
        }
        );
      })

  }


}
