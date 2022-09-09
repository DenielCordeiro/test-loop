import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Vehicle } from '../models/vehicle.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor( private http: HttpClient, private authService: AuthService ) { }

  getElements(): Observable<Vehicle[]> {
    const token = this.authService.getAuthorizationToken();
    return this.http.get<Vehicle[]>(`${environment.getVehicles}`);
  }

  createElements(element: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${environment.getVehicles}`, element);
  }

  editElements(element: Vehicle): Observable<any> {
    return this.http.put<any>(`${environment.getVehicles}/${element.id}`, element);
  }

  deleteElement(element: Vehicle): Observable<any> {
    return this.http.delete<any>(`${environment.getVehicles}/${element.id}`);
  }
}
