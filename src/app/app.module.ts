import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TableCardModule } from './modules/table-card/table-card.module';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { BatchComponent } from './components/batch/batch.component';
import { BatchHandlerComponent } from './pages/batch-handler/batch-handler.component';
import { TableCoreModule } from './modules/table/table-core.module';
import { BatchDetailComponent } from './components/batch/batch-detail/batch-detail.component';
import { ConfigurationHandlerComponent } from './pages/configuration-handler/configuration-handler.component';
import { ControlStateDialogComponent } from './components/batch/control-state-dialog/control-state-dialog.component';
import { ToLocalDateTimePipe } from './pipe/to-local-date-time.pipe';
import { TranslocoRootModule } from './transloco-root.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BatchFilterComponent } from './components/batch/filter/batch-filter.component';
import { BatchDetailHandlerComponent } from './components/batch/batch-detail-handler/batch-detail-handler.component';
import { PageNotFoundComponent } from './pages/not-found-page/page-not-found.component';
import { MatDialogModule } from '@angular/material/dialog';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => keycloak.init({
    config: environment.keycloak
  });
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    TableCardModule,
    TableCoreModule,
    TranslocoRootModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    BatchComponent,
    ConfigurationComponent,
    BatchHandlerComponent,
    BatchDetailHandlerComponent,
    BatchDetailComponent,
    ConfigurationHandlerComponent,
    ControlStateDialogComponent,
    ToLocalDateTimePipe,
    BatchFilterComponent,
    PageNotFoundComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'cs-CZ'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
