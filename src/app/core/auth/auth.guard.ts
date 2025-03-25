// import { CanActivateFn } from '@angular/router';
//
// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   if (this.authService.isAuthenticated()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
  //     return false;
  //   }
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const requiredRoles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getRole(); // Méthode pour récupérer le rôle de l'utilisateur

    console.log("required roles = ", requiredRoles, " user role = ", userRole)

    if (requiredRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/login']); // Rediriger vers la page de login si non autorisé
      return false;
    }
  }
}
