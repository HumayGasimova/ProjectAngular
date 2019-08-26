import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'app/services/category.service';
import { Subscription } from 'rxjs';
import { ProductsService } from 'app/services/products.service';
import { CustomValidators } from 'app/models/custom-validators';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit,OnDestroy {
  public form: FormGroup;
  categories=[];
  subscriptionCategories: Subscription;
  subscriptionProduct: Subscription;

  constructor(
    public fb: FormBuilder,
    private categoryService: CategoryService,
    private productsServices: ProductsService
  ) {
    this.subscriptionCategories = categoryService.getAllCategories()
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
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: ['', [
        Validators.required,
        Validators.pattern(/[0-9]/) 
      ]],
      category: ['', Validators.required],
      imageUrl: ['', [
        Validators.required,
        Validators.pattern(/^(http|https):/) 
      ]
    ]
    })
   
  }

  add(){
    if(!this.form.valid){
      this.form.markAllAsTouched(); 
      // console.log(this.form.controls.surname)
      return false;
    }
    if(this.form.valid){ 
     
      let product = this.form.value;
      this.subscriptionProduct = this.productsServices.addProduct(product)
      .subscribe(x=>x);
      this.form.reset()
      // console.log(product)
    }
  }

  ngOnDestroy(){
    // this.subscriptionCategories.unsubscribe();
    // this.subscriptionProduct.unsubscribe();
  }

}
