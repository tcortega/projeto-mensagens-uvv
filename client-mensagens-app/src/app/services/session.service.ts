import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login({ email, password }: { email: string; password: string }) {
    return this.http.post(
      this.apiUrl + 'sessions',
      { email, password }
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  setUsername(name: string) {
    localStorage.setItem("name", name);
  }

  storeLoginResponse(res) {
    localStorage.setItem("token", res.accessToken);
    const payload = this.getUserPayload(res.accessToken);
    this.setUsername(payload.name)
  }

  getName() {
    return localStorage.getItem('name');
  }

  getUserPayload(token?: string) {
    token = token ?? this.getToken();

    if (!token) return null;

    const userPayload = atob(token.split('.')[1]);
    return JSON.parse(userPayload);
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();

    return userPayload ? userPayload.exp > Date.now() / 1000 : false;
  }
}
