import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Login } from '../models/login.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin! : NgForm

  login: Login = new Login()

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  async makeLogin() {
    try{
      if (this.formLogin.form.valid) {
        const result = await this.authService.authUser(this.login);
        console.log(`Login efetuado: ${result}`);
        this.router.navigate(["/vehicles"]);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
