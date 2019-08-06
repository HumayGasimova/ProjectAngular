
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 
})
export class AppComponent {
 

  constructor(
    private auth: AuthService,
    private userService: UserService,
    router: Router
  ) {

    auth.user$.subscribe(user => {
      if(user){
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
  })
  }



}
