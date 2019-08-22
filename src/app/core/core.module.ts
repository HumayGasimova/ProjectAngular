import { NgModule } from '@angular/core';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';


@NgModule({
  declarations: [
    BsNavbarComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
      }
    ])
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
