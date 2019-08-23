import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { AppUser } from 'app/models/appUser';
import { IfStmt } from '@angular/compiler';
import { AppService } from 'app/app.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  appUser;

  constructor(
    private authService: AuthService,
    private appServices: AppService
  ) { 
 
  }

  ngOnInit() {
    this.appUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.appUser)
  }

}
