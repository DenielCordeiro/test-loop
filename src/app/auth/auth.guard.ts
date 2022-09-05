import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const loggedUser = this.loginService.loggedInUser;
      let url = state.url;

      if (loggedUser) {
        if (route.data?.['role'] && route.data?.['role'].indexOf(loggedUser.perfil)===-1) {

          this.router.navigate(['/login'], {
            queryParams: { error: "Proibido o acesso a " + url }
          });

          return false;
        }

        return true;
      }

      this.router.navigate(['/login'], {
        queryParams: { error: "Deve fazer o login antes de acessar " + url}
      });

      return false;
  }
}
