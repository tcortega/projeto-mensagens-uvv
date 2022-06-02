import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Envia mensagens, passando o JWT
  sendMessage(content: string) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };

    return this.http.post(
      this.apiUrl + 'messages',
      { content },
      {
        headers,
      }
    );
  }

  // Busca por todas mensagens e passa o JWT
  getAllMessages() {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };

    return this.http.get(this.apiUrl + 'messages', {
      headers,
    });
  }
}
