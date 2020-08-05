import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export interface IStatus {
  status: string;
}

export class HttpService {
  static handleError(error: HttpErrorResponse) {
    if ('error' in error) {
      console.error(`Server error ${error.status} occured: ${error.error.error}`, error.error);
    } else {
      console.error(`Server error ${error}`, error);
    }

    return throwError('Nastala chyba. Prosím opakujte akci.');
  }
}
