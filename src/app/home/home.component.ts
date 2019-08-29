import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'app/services/products.service';
import { CategoryService } from 'app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'app/services/shopping-cart.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ShoppingCart } from 'app/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products=[];
  categories=[];
  category;
  filteredProducts;
  cart$ ;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoryService,
    private shoppingCartServices: ShoppingCartService,
    private route: ActivatedRoute
  ) { 
    

    categoryService.getAllCategories()
      .subscribe(x=>{
        for(let key in x){
          this.categories.push({
            category: key,
            data: x[key]
          })
        }
      });
  }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartServices.getCart());
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAllProducts()
    .switchMap(products => {
      for(let key in products){
        this.products.push({
          id: key,
          data: products[key]
        })
      }
      return this.route.queryParams
    })
    .subscribe(params => {
      this.category = params.category
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.data.category === this.category) : 
    this.products
  }

  addToCart(product) {
    this.shoppingCartServices.addToCart(product)
  }

  removeFromCart(product) {
    this.shoppingCartServices.removeFromCart(product);
  }
  
}
