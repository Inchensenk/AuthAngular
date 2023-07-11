import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //FormGroup ангуляровский класс
  //loginForm! -значение не проинициализировано(!-чтобы заткнуть компилятор)
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService) {
  }


  //Отправка формы
  submitLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['admin']),
      error: (err) => alert(err.message)
    });
  }

  //ngOnInit- метод срабатывает только 1 раз при инициализации
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      /* Validators.required- поле обязательно
      Validators.pattern- кастомный паттерн валидации через регулярки /паттернв внутри косых/*/
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        ])
    });
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['admin'])
    }
  }

}
