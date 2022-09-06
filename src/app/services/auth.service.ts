import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/login.model';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from './../../environments/environment';


let Usertoken = ''
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) {}

  public get loggedInUser(): User {
    let checkUser = localStorage[Usertoken];
    return (checkUser ? JSON.parse(localStorage[Usertoken]) : null);
  }

  public set loggedInUser(user: User) {
    localStorage[Usertoken] = JSON.stringify(user);
  }

  async authUser(login: Login) {
    const result = await this.http.post<any>(`${environment.postLogin}`, login).toPromise();
    if (result && result.data.token) {
      Usertoken = result.data.token;
      localStorage.setItem('token', result.data.token);
      return (true);
    }

    return false;
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token')
    return token;
  }

  logout() {
    delete localStorage[Usertoken];
  }

  // authUser(login: Login): Observable<any> {
  //   let checkUser = new User();

  //   const httpHeaders = new HttpHeaders({
  //     'content-type': 'application/json',
  //     'Authorization': `Bearer${this.token}`
  //   })

  //   this.http.post<any>(`${this.loginApiUrl}?email=${login.email}&password=${login.password}`, httpHeaders);

  //   if (login.email, login.password) {

  //     if (login.email == "dcordeiro962@gmail.com" && login.password == "12345678") {
  //       checkUser = new User(1, login.email, login.password, "Daniel Cordeiro");
  //     }

  //     return of(checkUser);
  //   } else {
  //     alert('Incorrect username or password');
  //   }
  // }
}
