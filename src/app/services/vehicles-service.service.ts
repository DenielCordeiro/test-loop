import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../models/vehicle.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  elementApiUrl = ''

  constructor( private http: HttpClient ) { }

  getElements(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.elementApiUrl);
  }

  createElements(element: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.elementApiUrl, element);
  }

  editElements(element: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(this.elementApiUrl, element);
  }

  deleteElement(id: number): Observable<any> {
    return this.http.delete<any>(`${this.elementApiUrl}?id=${id}`);
  }
}
