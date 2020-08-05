import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public username: string = "admin@data.com";
  enabledStatistic: boolean = environment.enabledStatistics;

  constructor(private kc: KeycloakService) {
  }

  public async ngOnInit() {
    if (await this.kc.isLoggedIn()) {
      this.username = this.kc.getUsername();
    }
  }

  public async logout() {
    await this.kc.logout(window.location.origin);
  }
}
