import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import emailMask from 'text-mask-addons/dist/emailMask'
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public form: FormGroup;
  public mask = emailMask
  constructor(
    public fb: FormBuilder,
    private authService: AuthService
  ) { }

  
  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/) 
      ]],
      password: [null, Validators.required]
    })
  }

  // login(){
  //  let data: Object = this.form.value;
  //   this.authService.login(data)
  // }

  loginGoogle(){
    this.authService.loginWithGoogle();
  }

  // mask(rawValue) {
  //  console.log(rawValue)
  //  let string1 = /^[a-zA-Z0-9_.-]*$/
  //  let string2 = /^[a-zA-Z0-9_.-]*$/
  //  let string3 = /^[a-zA-Z0-9_.-]*$/
  //   let mask = [string1, '@', string2, '.', string3]
  // //  let mask = [/[1-9]/, '@', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  //   return mask
  // }

}
