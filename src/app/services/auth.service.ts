import { inject, Injectable } from '@angular/core';
import { UserLogin } from '../models/user-login';
import { UserRegister } from '../models/user-register';
import { HttpClient } from '@angular/common/http';
import { authTokenKey, UserToken } from '../models/user-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = import.meta.env['NG_APP_PUBLIC_URL'];

  login(data: UserLogin) {
    return this.httpClient.post<UserToken>(
      `${this.apiUrl}/api/auth/login`,
      data,
    );
  }

  register(data: UserRegister) {
    return this.httpClient.post(`${this.apiUrl}/api/auth/register`, data);
  }

  logout() {
    localStorage.removeItem(authTokenKey);
  }

  isLoggedIn() {
    return !!localStorage.getItem(authTokenKey);
  }
}
