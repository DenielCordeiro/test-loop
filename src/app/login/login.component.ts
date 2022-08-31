import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './../services/login.service';
import { Login } from '../models/login.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin! : NgForm

  login: Login = new Login()
  message: string = '';
  loading: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.loginService.loggedInUser) {
      this.router.navigate( ["/vehicles"] );
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.message = params['error'];
    });
  }

  makeLogin(): void {
    this.loading = true;

    if (this.formLogin.form.valid) {

      this.loginService.login(this.login).subscribe((checkUser) => {
        if (checkUser != null) {
          this.loginService.loggedInUser = checkUser;
          this.loading = false;
          this.router.navigate( ["/vehicles"] );
        } else {
          this.loading = false;
          this.message = "Usuário ou Senha Invalidos.";
        }
      });
    }
  }
}
