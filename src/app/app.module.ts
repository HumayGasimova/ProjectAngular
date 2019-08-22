import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { 
  HttpClientModule, 
  // HTTP_INTERCEPTORS 
} from '@angular/common/http';

import { DataService } from './services/data.service';

import { RouterModule } from '@angular/router';

import { HttpModule, Http, BaseRequestOptions } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular5-data-table';

import { environment } from '../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './shared/services/auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { ShoppingModule } from './shopping/shopping.module';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    NgbModule,
    CustomFormsModule,
    DataTableModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'login',
        component: LoginComponent,
      }
    ])
  ],
  providers: [
   
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpConfigInterceptor,
    //   multi:true
    // }
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
