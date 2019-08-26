import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  public form: FormGroup;

  constructor(
    public fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      price: [null, Validators.required],
      category: [null, Validators.required],
      imageUrl: [null, Validators.required]
    })
    
  }

}
