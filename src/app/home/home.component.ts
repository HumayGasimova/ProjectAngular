import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'app/services/products.service';
import { CategoryService } from 'app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products=[];
  categories=[];
  constructor(
    private productService: ProductsService,
    private categoryService: CategoryService
  ) { 
    productService.getAllProducts()
    .subscribe(products => {
      for(let key in products){
        this.products.push({
          id: key,
          data: products[key]
        })
      }
    });

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

  ngOnInit() {
    console.log(this.products)
  }

}
