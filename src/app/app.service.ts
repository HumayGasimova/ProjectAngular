import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
isOpen: boolean = false;
  constructor() { }

  toggleClose(){
    this.isOpen = false;
  }

  toggleCollapsed(){
    this.isOpen = !this.isOpen;
  }
}
