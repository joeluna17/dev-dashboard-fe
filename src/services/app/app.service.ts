import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private baseUrl = environment.base_url;
  constructor(private _http: HttpClient) {}

  getAllAppUsers() {
    return this._http.get(`${this.baseUrl}/api/Users`);
  }

  loginUser(loginCreds: { ['key']: string; ['key2']: string }) {
    return this._http.post(`${this.baseUrl}/api/Account/Login`, loginCreds);
  }

  getProfile() {
    return this._http.get('https://localhost:5001/api/users/profile').pipe(
      map((data: any) => {
        if (
          data['position']['authorizationType'] ||
          data['position']['currntlyEmployeed']
        ) {
          delete data['position']['authorizationType'];
          delete data['position']['currntlyEmployeed'];
        }
        return data;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(
      `Something bad happened; please try again later.${error.message}`
    );
  }
}
