import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicle } from '../models/vehicle.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  elementApiUrl = 'https://api.360kpi.io/planning/vehicle';

  constructor( private http: HttpClient, private authService: AuthService ) { }

  getElements(): Observable<Vehicle[]> {
    const token = this.authService.getAuthorizationToken();
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer${token}`
    })


    return this.http.get<Vehicle[]>(this.elementApiUrl, {headers: httpHeaders});
  }

  createElements(element: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.elementApiUrl, element);
  }

  editElements(element: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(this.elementApiUrl, element);
  }

  deleteElement(company: number): Observable<any> {
    return this.http.delete<any>(`${this.elementApiUrl}?id=${company}`);
  }
}
