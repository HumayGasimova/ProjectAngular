import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { AppUser } from 'app/models/appUser';
import { IfStmt } from '@angular/compiler';
import { AppService } from 'app/app.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;

  constructor(
    private authService: AuthService,
    private appServices: AppService,
    private userService: UserService
  ) { 
 
  }

  ngOnInit() {
   
    this.authService.appUser$.subscribe(appUser =>{
      this.appUser = appUser
      console.log("uhjio",this.appUser)
    })
  }

  logout(){
    this.authService.logout();
  }

}
