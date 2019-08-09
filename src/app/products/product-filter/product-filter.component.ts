import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;
  constructor(
    categoryService: CategoryService
  ) { 
    this.categories$ = categoryService.getCategories().snapshotChanges()
      .map(changes => {
        return changes.map(c =>{
        return ({ key: c.payload.key, ...c.payload.val()})
        }
        );
      })
  }

  ngOnInit() {
  }

}
