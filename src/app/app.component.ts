
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { AppService } from './app.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 
})
export class AppComponent {
 

  constructor(
    public appServices: AppService) {
  }

  // toggleClose(){
  //   this
  // }
  
}
