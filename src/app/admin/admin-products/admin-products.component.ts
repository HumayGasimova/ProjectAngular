import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products$;
  productRef;
  productKey$: Observable<any[]>;
  constructor(
    private productService: ProductService,
    private db: AngularFireDatabase
  ) {
    this.products$ = this.productService.getAll();

    this.productRef = db.list('/product');
    this.productKey$ = this.productRef.snapshotChanges()
    .map(changes => {
      console.log(changes)
        return changes.map(c =>{
          console.log("ggg", { key: c.payload.key, ...c.payload.val()})
         return ({ key: c.payload.key, ...c.payload.val()})
        }
        );
   });
   console.log("hey", this.productKey$)
   }

  ngOnInit() {
   
  }
 
}
