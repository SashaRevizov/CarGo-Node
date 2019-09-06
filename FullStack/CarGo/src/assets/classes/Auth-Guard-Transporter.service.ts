import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardTransporterService implements CanActivate, CanActivateChild {

constructor(private auth: AuthService, private router: Router) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
  if(this.auth.isAuth()){
      return of(true)
  }else{
      this.router.navigate(['/transporter'],{
          queryParams: {
              accessDenied: true
          }
      })
      return of(false)
  }
}
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return this.canActivate(route, state)
  }
}
