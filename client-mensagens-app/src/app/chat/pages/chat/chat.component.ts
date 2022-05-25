import { Component, OnInit } from '@angular/core';
import { Message } from './../../../core/models/messages/message.model';
import { MessageService } from './../../../services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from './../../../../environments/environment';
import Pusher from 'pusher-js';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  pusherData = environment.pusher;

  messages: Message[] = [];
  constructor(private messageService: MessageService, private spinner: NgxSpinnerService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadAllMessages();

    const pusher = new Pusher(this.pusherData.key, {
      cluster: this.pusherData.cluster
    });

    const channel = pusher.subscribe('chat');
    channel.bind("new_message", (msg) => this.messages.unshift(msg));
  }

  sendMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.value) return;

    this.messageService
      .sendMessage(input.value)
      .subscribe({ next: (res) => {console.log(res)}, error: (err) => {console.log(err)} });

    input.value = '';
  }

  loadAllMessages() {
    this.spinner.show();
    this.messageService
      .getAllMessages()
      .subscribe({ next: (res: Message[]) => {
        this.setMessages(res);
        this.spinner.hide();
      }, error: (err) => {
        this.spinner.hide();
        this.toastr.error("Ocorreu um erro ao tentar carregar as mensagens :( Por favor tente novamente.");
      } });
  }

  setMessages(messages: Message[]) {
    messages.sort(function(a,b){
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    this.messages = messages;
  }
}
