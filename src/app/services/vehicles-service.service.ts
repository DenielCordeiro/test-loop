import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Vehicle } from '../models/vehicle.model';
import { lastValueFrom } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor( private http: HttpClient ) { }

  getVehicles(): Promise<{data:Vehicle[]}> {
    return lastValueFrom(this.http.get<{data:Vehicle[]}>(`${environment.apiVehicles}`));
  }

  getVehicle(id: number): Promise<{data:Vehicle}> {
    return lastValueFrom(this.http.get<{data:Vehicle}>(`${environment.apiVehicles}/${id}`));
  }

  createVehicle(vehicle: Vehicle): Promise<Vehicle> {
    return lastValueFrom(this.http.post<Vehicle>(`${environment.apiVehicles}`, vehicle));
  }

  editVehicle(vehicle: Vehicle): Promise<Vehicle> {
    return lastValueFrom(this.http.put<Vehicle>(`${environment.apiVehicles}/${vehicle.id}`, vehicle));
  }

  deleteVehicle(vehicle: Vehicle): Promise<Vehicle> {
    return lastValueFrom(this.http.delete<Vehicle>(`${environment.apiVehicles}/${vehicle.id}`));
  }
}
