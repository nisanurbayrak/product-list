import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response';
import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_KEY = 'AIzaSyBHm347gcV7W88Pefq-0pWuoQ6Akjq4M20';
  signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  register(email: string, password: string, autoLogin: boolean = false) {
    return this.http
      .post<AuthResponse>(this.signUpUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((response) => {
          if (autoLogin) {
            this.handleUser(
              response.email,
              response.localId,
              response.idToken,
              response.expiresIn
            );
          } else {
            console.log('Yeni kullanıcı başarıyla kaydedildi.');
          }
        }),
        catchError(this.handleError)
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(this.signInUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((response) => {
          this.handleUser(
            response.email,
            response.localId,
            response.idToken,
            response.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  autoLogin() {
    if (localStorage.getItem('user') === null) {
      return;
    }
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const loadUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );
    if (loadUser.token) {
      this.user.next(loadUser);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
  }

  private handleError(err: HttpErrorResponse) {
    let message = 'Bir hata oluştu.';
    const errorMessage = err.error.error.message;

    if (err.error.error) {
      switch (errorMessage) {
        case 'EMAIL_EXISTS':
          message = 'Bu mail adresi zaten kullanılıyor.';
          break;
        case 'EMAIL_NOT_FOUND':
          message = 'Bu mail adresi ile bir kayıt bulunamadı.';
          break;
        case 'INVALID_PASSWORD':
          message = 'Şifre yanlış.';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          message = 'Mail ya da şifre yanlış.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          message = 'Çok hatalı deneme yaptınız. Daha sonra tekrar deneyiniz.';
          break;
      }
    }

    return throwError(() => message);
  }

  private handleUser(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);

    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
