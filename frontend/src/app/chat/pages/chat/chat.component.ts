import { Component, OnInit } from '@angular/core';
import { Message } from './../../../core/models/messages/message.model';
import { MessageService } from './../../../services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from './../../../../environments/environment';
import Pusher from 'pusher-js';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  pusherData = environment.pusher;
  isInputDisabled = true;
  placeholder = 'Converse por aqui...';

  messages: Message[] = [];
  constructor(
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllMessages();

    // Cria canal do pusher baseado nas configurações que estão no environment.ts
    const pusher = new Pusher(this.pusherData.key, {
      cluster: this.pusherData.cluster,
    });

    // Se inscreve no canal do chat
    const channel = pusher.subscribe('chat');

    // Quando o evento de mensagem chegar, quero adicionar a mensagem à array de mensagens que é exibida na tela.
    channel.bind('new_message', (msg) => this.messages.unshift(msg));
  }

  sendMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.value) return;
    const msg = input.value;
    input.value = '';

    this.isInputDisabled = true;
    this.placeholder = 'Enviando mensagem...';

    // chama api para enviar mensagem
    this.messageService
      .sendMessage(msg)
      .subscribe({ next: () => this.resetPlaceholder(), error: (err) => {
        if (err.status == 403) return this.logout();

        this.toastr.error("Ocorreu um erro ao tentar enviar mensagem... Por favor, tente novamente.")
        input.value = msg;
      } });

    this.isInputDisabled = false;
  }

  logout(): void {
    this.sessionService.deleteToken();
    this.toastr.error("Você foi desconectado!")
    this.router.navigate(['/login']);
  }

  // carregamento de todas mensagens
  loadAllMessages() {
    this.spinner.show();
    this.messageService.getAllMessages().subscribe({
      next: (res: Message[]) => {
        this.setMessages(res);
        this.spinner.hide();
        this.isInputDisabled = false;
      },
      error: (err) => {
        this.spinner.hide();

        if (err.status == 403) return this.logout();

        this.toastr.error(
          'Ocorreu um erro ao tentar carregar as mensagens :( Por favor tente novamente.'
        );
      },
    });
  }

  setMessages(messages: Message[]) {
    messages.sort(function (a, b) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    this.messages = messages;
  }

  resetPlaceholder() {
    this.placeholder = 'Converse por aqui...';
  }
}
