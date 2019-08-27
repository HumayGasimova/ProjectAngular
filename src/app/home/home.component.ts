import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products=[];
  constructor(
    private productService: ProductsService
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
  }

  ngOnInit() {
    console.log(this.products)
  }

}
