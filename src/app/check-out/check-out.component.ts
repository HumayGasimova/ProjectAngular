import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {
  shipping={};

  constructor() { }


  placeOrder(){
    console.log(this.shipping);
  }
}
