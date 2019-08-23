import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User;

  constructor(
    private afAuth: AngularFireAuth,
    public router: Router
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

  async login(email: string, password: string){
    var result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.sendEmailVerification();
    // this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
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
