import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';

@Injectable()
export class AuthGuard extends KeycloakAuthGuard {
  constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.authenticated) {
      await this.keycloakAngular.login();
      return;
    }
    const requiredRoles = route.data.roles;
    let granted = false;
    if (!requiredRoles || requiredRoles.length === 0) {
      granted = true;
    } else {
      for (const requiredRole of requiredRoles) {
        if (this.roles.indexOf(requiredRole) > -1) {
          granted = true;
          break;
        }
      }
    }

    if (granted === false) {
      const redirect = `/noaccess`;
      await this.router.navigate([redirect, {url: route.routeConfig.path}]);
    }
    return granted;
  }
}
