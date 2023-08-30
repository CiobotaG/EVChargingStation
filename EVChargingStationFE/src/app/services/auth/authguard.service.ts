import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChildFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (this.authService.isLoggedIn) {
          return true;
        }
        
        this.authService.redirectUrl = state.url;
      
        return this.router.parseUrl('/login');
      }
      
}
