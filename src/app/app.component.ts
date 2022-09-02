import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'test-loop';

  constructor( private loginService: LoginService ) {}

  get loggedInUser(): User | null {
    return this.loginService.loggedInUser;
  }
}
