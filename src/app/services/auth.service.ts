import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  //Фейковая авторизация через localStorage

  //Создание токена с данными по авторизации
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  //получение токена с данными по авторизации
  getToken() {
    return localStorage.getItem('token');
  }

  //Проверка залогинен пользоватеь или нет
  isLoggedIn() {
    return this.getToken() !== null;
  }

  login(userInfo: {email: string, password: string}): Observable<string | boolean> {
    if (userInfo.email === 'admin@gmail.com' && userInfo.password === 'admin123'){
      this.setToken('alksflkgsklgjslkjffksdgjnsadgskmg')
      return of(true)
    }
    return throwError(() => new Error('Failed Login'))
  }

  logout(){
    this.router.navigate(['login'])
  }
}

