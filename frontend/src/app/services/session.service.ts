import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Chama api de login
  login({ email, password }: { email: string; password: string }) {
    return this.http.post(
      this.apiUrl + 'sessions',
      { email, password }
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  // Remove persistencia local para logout
  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  // Define usuário
  setUsername(name: string) {
    localStorage.setItem("name", name);
  }

  // Armazena o token no localStorage
  storeLoginResponse(res) {
    localStorage.setItem("token", res.accessToken);
    const payload = this.getUserPayload(res.accessToken);
    this.setUsername(payload.name)
  }

  // Recupera o nome do usuário que foi armazenado no localStorage
  getName() {
    return localStorage.getItem('name');
  }


  // Decodifica o token
  getUserPayload(token?: string) {
    token = token ?? this.getToken();

    if (!token) return null;

    const userPayload = atob(token.split('.')[1]);
    return JSON.parse(userPayload);
  }

  // Verifica se o usuário esta logado pela data de expiração do JWT
  isLoggedIn() {
    const userPayload = this.getUserPayload();

    return userPayload ? userPayload.exp > Date.now() / 1000 : false;
  }
}
