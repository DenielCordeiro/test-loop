import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '../models/login.model';
import { User } from './../models/user.model';

const KEY: string = "loggedInUser"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public get loggedInUser(): User {
    let checkUser = localStorage[KEY];
    return (checkUser ? JSON.parse(localStorage[KEY]) : null);
  }

  public set loggedInUser(user: User) {
    localStorage[KEY] = JSON.stringify(user);
  }

  login(login: Login): Observable<User | null> {
    let checkUser = new User(1, login.login, login.password);

    if (login.login == login.password) {

      if (login.login == "user") {
        checkUser = new User(1, "User", login.login, login.password, "USER");
      }
      else if (login.login == "admin") {
        checkUser = new User(1, "Admin", login.login, login.password, "ADMIN");
      }

      return of(checkUser);

    } else {
      return of(null);
    }
  }

  logout() {
    delete localStorage[KEY];
  }

}
