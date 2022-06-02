import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from './../../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  // Declara propriedades a serem passada via injeção de dependência
  constructor(
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Caso o usuário já esteja logado, redireciona ele para o chat
    if (this.sessionService.isLoggedIn()) this.redirectLoggedInUser();

    // Cria o formulário de login e diz que ele é obrigatório (Validators.required)
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  redirectLoggedInUser() {
    this.toastr.success("Restauramos sua sessão para você! :)");
    this.router.navigate(['/chat']);
  }

  onSubmit() {
    // Se o formulário for inválido, não vai enviar.
    if (!this.form.valid) return;

    this.spinner.show();

    // Chama a api para login
    this.sessionService.login(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.toastr.success(
          'Login feito com sucesso!\n Redirecionando para o chat...'
        );

        // Armazena o token no localStorage
        this.sessionService.storeLoginResponse(res);
        this.router.navigate(['/chat']);
      },
      error: ({ error }) => {
        this.toastr.error(error[0].message);
        this.spinner.hide();
      },
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
