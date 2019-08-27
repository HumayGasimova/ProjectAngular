
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { AppService } from './app.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 
})
export class AppComponent implements OnInit {

  constructor(
    public appServices: AppService,
    private authServices: AuthService,
    private userServices: UserService
  ) {
    authServices.user$.subscribe(user => {
     if(user){
      userServices.save(user);
     }
     
    })
  }

  ngOnInit() {
    
  }

  
}
