import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,  AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User){
    console.log(user)
    this.db.object('/user/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }
}
