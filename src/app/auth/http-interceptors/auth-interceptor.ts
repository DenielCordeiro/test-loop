import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements AuthInterceptor {

  constructor( private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthorizationToken();
    let request: HttpRequest<any> = req;

    if (token && !this.authService.isTokenExperid(token)) {

      request = req.clone({
        // headers: req.headers.set('firebase', `${token}`),
        headers: new HttpHeaders({
          'business-app': environment.businessApp,
          'company': environment.company,
          'firebase': token,
          'refresh': environment.refresh
        })
      });
    }

    return next.handle(request)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro: ', error.error.message)
    } else {
      console.error(
        `Código do erro ${error.error}, ` +
        `Erro: ${JSON.stringify(error.error)}`
      );
    }

    return throwError('Ocorreu um erro, tente novamente');
  }
}
