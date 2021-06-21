import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
}
