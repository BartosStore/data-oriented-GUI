import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IConfigurationDto } from 'src/app/models/configuration.model';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http-service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private url: string = environment.backend.apiBaseUrl;

  constructor(private http: HttpClient) { }

  fetchConfigurationData(): Observable<IConfigurationDto> {
    return this.http
      .get<IConfigurationDto>(`${this.url}/configurations`)
      .pipe(catchError(HttpService.handleError));
  }

  updateConfigurationData(newConfiguration: IConfigurationDto): Observable<IConfigurationDto> {
    return this.http
      .post<IConfigurationDto>(`${this.url}/configurations`, newConfiguration)
      .pipe(catchError(HttpService.handleError));
  }
}
