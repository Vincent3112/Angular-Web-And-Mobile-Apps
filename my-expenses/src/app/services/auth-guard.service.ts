import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private loginService: LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.loginService.authenticated) {
      return true;
    } else {
      this.router.navigate(['auth']);
      return false;
    }
  }
}
