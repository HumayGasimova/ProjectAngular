import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    public http: HttpClient,
    private db: AngularFireDatabase
  ) { }

  getAllCategories() {
    // return this.db.list('/categories', ref => ref.orderByChild('name'));
    return this.http.get('https://projectangular-a927e.firebaseio.com/categories.json');
  }
}
