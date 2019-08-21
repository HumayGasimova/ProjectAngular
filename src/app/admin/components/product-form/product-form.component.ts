import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { CategoryService } from 'app/shared/services/category.service';
import { ProductService } from 'app/shared/services/product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: any = {};
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { 

    this.categories$ = categoryService.getCategories().valueChanges();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
        this.productService.getProduct(this.id).take(1).subscribe(p => this.product = p);
   }

  }

  save(product) {
    if(this.id){
      this.productService.update(this.id, product)
    } else{
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm("Are you sure you want to delete this product?")) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    
  }

  ngOnInit() {
  }

}
