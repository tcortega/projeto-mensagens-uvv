import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nome: string;

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.nome = this.sessionService.getName();
  }

}
