import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../models/auth-response';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loading: boolean = false;
  isLoginMode: boolean = true;
  errorMsg: string = '';
  error: string = '';
  model: any = {
    password: '',
    email: '',
  };
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  handleAuth(form: NgForm) {
    this.loading = true;
    const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com'];
    const emailParts = this.model.email.split('@');

    if (emailParts.length != 2) {
      this.errorMsg = 'Geçerli bir e-posta adresi girin.';
    } else {
      const emailDomain = emailParts[1];

      if (!allowedDomains.includes(emailDomain)) {
        this.errorMsg =
          'Mail adresi: @gmail.com, @hotmail.com veya @outlook.com uzantılı olmalıdır.';
      } else {
        this.errorMsg = ''; // Hata mesajını temizliyoruz
        const email = form.value.email;
        const password = form.value.password;
        let authResponse: Observable<AuthResponse>;

        if (this.isLoginMode) {
          authResponse = this.authService.login(email, password);
        } else {
          authResponse = this.authService.register(email, password);
        }
        authResponse.subscribe({
          next: () => {
            this.loading = false;
            this.error = '';
            this.router.navigate(['/']);
          },
          error: (err) => {
            this.loading = false;
            this.error = err;
          },
        });
      }
    }
  }
}
