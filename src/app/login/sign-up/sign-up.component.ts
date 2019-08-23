import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private authService: AuthService
  ) { }

  
  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  login(){
   let data: Object = this.form.value;
   console.log(data)
    this.authService.login(data)
  }

  loginGoogle(){
    this.authService.loginWithGoogle();
  }

}
