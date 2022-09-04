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
    let checkUser = new User(1, login.name, login.password);

    if (login.name == "user" || login.name == "admin" && login.password == "user" || login.password == "admin") {

      if (login.name == "user") {
        checkUser = new User(1, login.name, login.password, "USER");
      }
      else if (login.name == "admin") {
        checkUser = new User(2, login.name, login.password, "ADMIN");
      }

      return of(checkUser);

    } else {
      alert('Incorrect username or password');
      return of(null);
    }
  }

  logout() {
    delete localStorage[KEY];
  }

}
