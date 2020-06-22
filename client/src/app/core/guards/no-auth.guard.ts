import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageKeys} from "../modals/storage-keys.enum";



@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate, CanLoad {

  constructor(
    private router: Router,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggined = !!localStorage.getItem(StorageKeys.TOKEN);
    if (isLoggined) {
      this.router.navigateByUrl('/users');
      return false;
    }
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggined = !!localStorage.getItem(StorageKeys.TOKEN);
    if (isLoggined) {
      this.router.navigateByUrl('/users');
      return false;
    }
    return true;
  }

}

