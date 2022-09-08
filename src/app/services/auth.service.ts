import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Login } from '../models/login.model';
import { environment } from './../../environments/environment';

let Usertoken: string;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) {}

  public get loggedInUser() {
    return this.getAuthorizationToken();
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
    window.localStorage.removeItem('token');
  }
}
