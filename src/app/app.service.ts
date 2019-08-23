import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
isOpen: boolean = false;
  constructor(
    private authSevices: AuthService,
    private userSevices: UserService
  ) {
    // if(authSevices.user){
    //   userSevices.save(authSevices.user);
    // }
   }

  toggleClose(){
    this.isOpen = false;
  }

  toggleCollapsed(){
    this.isOpen = !this.isOpen;
  }
}
