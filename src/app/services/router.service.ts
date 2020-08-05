import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  public createLink(link, params: object = {}) {
    let routerLink = link;

    Object.keys(params).forEach(key => {
      routerLink = routerLink.replace(`:${key}`, params[key]);
    });

    return `/${routerLink}`;
  }
}
