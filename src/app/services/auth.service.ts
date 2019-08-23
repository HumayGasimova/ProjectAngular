import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { UserService } from './user.service';
import { AppUser } from 'app/models/appUser';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    public router: Router,
    private userServices: UserService
  ) { 
    this.user$ = afAuth.authState;
  }

  loginWithGoogle(){

   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   this.router.navigate(['/']);
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.switchMap(user => {
      if(user) return this.userServices.get(user.uid).valueChanges();
      return Observable.of(null);
    })
  }

}
