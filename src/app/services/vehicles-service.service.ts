import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Vehicle } from '../models/vehicle.model';
import { BaseService } from "./base-service";
import { LocalStorageService } from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class VehiclesService extends BaseService<Vehicle> {

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    super(httpClient, localStorageService, 'planning/vehicle');
  }
}
