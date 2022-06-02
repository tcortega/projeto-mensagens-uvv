import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public sessionService: SessionService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  logout() {
    this.sessionService.deleteToken();
    this.toastr.success('Desconectando...');
    this.router.navigate(['/login']);
  }
}
