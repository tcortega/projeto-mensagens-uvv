import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Chama api de cadastro
  signUp({
    name,
    email,
    password,
    passwordConfirmation,
  }: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }) {
    return this.http.post(this.apiUrl + 'users', {
      name,
      email,
      password,
      passwordConfirmation,
    });
  }
}
