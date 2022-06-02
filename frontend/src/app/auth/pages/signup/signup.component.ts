import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.form.valid) return;

    this.spinner.show();
    this.userService.signUp(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.toastr.success(
          'Usuário cadastrado com sucesso!\n Redirecionando para a tela de login...'
        );
        this.router.navigate(['/login']);
      },
      error: ({ error }) => {
        this.toastr.error(error[0].message);
        this.spinner.hide();
      },
    });
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirmation() {
    return this.form.get('passwordConfirmation');
  }
}
