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

  constructor(
    private sessionService: SessionService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.form.valid) return;

    this.spinner.show();
    this.sessionService.login(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.toastr.success(
          'Login feito com sucesso!\n Redirecionando para o chat...'
        );

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
