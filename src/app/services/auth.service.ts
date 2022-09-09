import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Login } from '../models/login.model';
import { environment } from './../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) {}

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();

    if(!token) {
      return false;
    } else if (this.isTokenExperid(token)) {
      return false;
    }

    return true;
  }

  async authUser(login: Login) {
    const result = await this.http.post<any>(`${environment.postLogin}`, login).toPromise();
    if (result && result.data.token) {
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

  getTokenExpirationDate(token: string): Date {
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);

    if(decoded.exp === undefined) {
      return decoded || null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExperid(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }
}
