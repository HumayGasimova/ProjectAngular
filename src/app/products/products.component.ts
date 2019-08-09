import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products$;
  categories$;

  constructor(
    productService: ProductService,
    categoryService: CategoryService
  ) { 
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getCategories();
  }


}
