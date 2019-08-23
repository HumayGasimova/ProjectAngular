import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User;

  constructor(
    private afAuth: AngularFireAuth,
    public router: Router,
    private db: AngularFireDatabase,
    private http: HttpClient
  ) { 
    this.afAuth.authState.subscribe(user=>{
      if(user){
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      }else{
        localStorage.setItem("user", null);
      }
    })

  }

  async login(data){
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);
    this.http.post('https://projectangular-a927e.firebaseio.com/', data)

    this.db.list('/users').push(data)
    console.log(result)
    // this.sendEmailVerification();
    // this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this.router.navigate(['/'])
  }

  async sendEmailVerification(){
    await this.afAuth.auth.currentUser.sendEmailVerification()
    this.router.navigate(['/'])
  }

  async sendPasswordResetEmail(passwordResetEmail){
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
  }

  async logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null
  }

  async loginWithGoogle(){
    await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.router.navigate(['/'])
  }
}
