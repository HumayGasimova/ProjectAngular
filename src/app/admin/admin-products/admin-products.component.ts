import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  productRef;
  productKey$: Observable<any[]>;
  subscription: Subscription;
  items: Product[]=[];
  itemCount: number;

  tableResource: DataTableResource<Product>

  constructor(
    private productService: ProductService,
    private db: AngularFireDatabase
  ) {
    //  this.subscription = this.productService.getAll().subscribe(products => {
       
    //   this.filteredProducts = products
    //   this.products = products
    //   console.log( this.filteredProducts)
    //  });

    this.productRef = db.list('/products');
    
    this.subscription = this.productRef.snapshotChanges()
    .map(changes => {
        return changes.map(c =>{
         return ({ key: c.payload.key, ...c.payload.val()})
        }
        );
   })
   .subscribe(prod => {
    this.products = prod;
    this.initializeTable(prod);
   })

  //   this.productKey$ = this.productRef.snapshotChanges()
  //   .map(changes => {
  //       return changes.map(c =>{
  //        return ({ key: c.payload.key, ...c.payload.val()})
  //       }
  //       );
  //  });
   }

  ngOnInit() {
   
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeTable(products: Product[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset: 0})
    .then(items => this.items = items);

    this.tableResource.count()
    .then(count => this.itemCount = count);
  }

  filter(query: string){
    let filteredProducts = (query) ? 
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
    this.products;

    this.initializeTable(filteredProducts)
  }

  relodeItems(params){
    if(!this.tableResource) return;
    this.tableResource.query({offset: params})
    .then(items => this.items = items);
  }
 
}
