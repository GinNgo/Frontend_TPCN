import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}
  canActivate() {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
