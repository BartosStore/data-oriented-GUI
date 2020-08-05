import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { KeycloakAngularModule } from 'keycloak-angular';

import { NoaccessComponent } from './pages/no-access-page/noaccess.component';
import { BatchHandlerComponent } from './pages/batch-handler/batch-handler.component';
import { ConfigurationHandlerComponent } from './pages/configuration-handler/configuration-handler.component';
import { BatchDetailHandlerComponent } from './components/batch/batch-detail-handler/batch-detail-handler.component';
import { AuthGuard } from './guards/auth.guard';
import { ROUTES } from './enums/routes';
import { environment } from 'src/environments/environment';
import { PageNotFoundComponent } from './pages/not-found-page/page-not-found.component';

const canActivate = environment.disabledSecurity ? [] : [AuthGuard];

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.BATCH,
    pathMatch: 'full',
  },
  {
    path: ROUTES.BATCH,
    component: BatchHandlerComponent,
    canActivate,
    data: { roles: ['user'] },
  },
  {
    path: ROUTES.BATCH_DETAIL,
    component: BatchDetailHandlerComponent,
    canActivate,
    data: { roles: ['user'] },
  },
  {
    path: ROUTES.CONFIGURATION,
    component: ConfigurationHandlerComponent,
    canActivate,
    data: { roles: ['user'] },
  },
  {
    path: ROUTES.NO_ACCESS,
    component: NoaccessComponent,
    canActivate,
    data: { roles: [] }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    KeycloakAngularModule,
  ],
  declarations: [
    NoaccessComponent,
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    RouterModule,
    MatButtonModule
  ],
})
export class AppRoutingModule { }
