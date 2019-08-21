import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import { AuthService } from 'app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(
    private auth: AuthService
  ) { }

  canActivate(): Observable<boolean>{
    return this.auth.appUser$
    .map(appUser => appUser.isAdmin);
  }
}
