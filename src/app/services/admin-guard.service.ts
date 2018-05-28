import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  CanActivate,
  RouterStateSnapshot,
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';
import { User } from '../model/user';

@Injectable()
export class AdminGuardService implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const profileData: User[] = JSON.parse(localStorage.getItem('profile'));
    if (profileData[0].moderator) {
      return true;
    } else {
      this.router.navigate(['logged/dashboard']);
      return false;
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(childRoute, state);
  }
}
