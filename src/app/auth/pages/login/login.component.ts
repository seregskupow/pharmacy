import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { customPatternValid } from '@validators/pattern.validator';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginSub!: Subscription;
  responseError = '';
  loading = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      customPatternValid({
        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        msg: 'Invalid pattern',
      }),
    ]),
  });

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

  submit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.loading = true;
      this.loginSub = this.authService.login(email, password).subscribe({
        next: (resp) => {
          console.log({ resp });
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loading = false;
          this.responseError = error;
        },
      });
    }
  }
}
