import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { BaseModel } from "../models/base-model";
import { LocalStorageService } from "ngx-webstorage";
import { environment } from "../../environments/environment";
import { lastValueFrom } from "rxjs";

interface LoopApiResponse<T extends BaseModel> {
  success: boolean,
  data: T | T[] | boolean
}

export abstract class BaseService<T extends BaseModel> {
  http!: HttpClient;
  localStorage!: LocalStorageService;
  route!: string;


  constructor(
    http: HttpClient,
    localStorage: LocalStorageService,
    route: string
  ) {
    this.http = http;
    this.localStorage = localStorage;
    this.route = environment.api + route;
  }

  public buildHeader(): HttpHeaders {
    let token = this.localStorage.retrieve('token');

    let headers = new HttpHeaders({
      'business-app': environment.businessApp,
      'company': environment.company,
      'firebase': token,
      'refresh': environment.refresh
    })

    return  headers
  }

  public getResources(): Promise<T[]> {
    let header = this.buildHeader();

    return lastValueFrom(this.http.get<LoopApiResponse<T>>(this.route, { headers: header }))
      .then(result => {
        return this.handleResponse(result) as T[];
      });
  }

  public getResource(id: number): Promise<T> {
    return lastValueFrom(this.http.get<LoopApiResponse<T>>(this.route + id ))
      .then(result => {
        return this.handleResponse(result) as T;
      })
  }

  public createResource(model: BaseModel): Promise<T> {
    return lastValueFrom(this.http.post<LoopApiResponse<T>>(this.route, model))
      .then(result => {
        return this.handleResponse(result) as T;
      })
  }

  public updateResource(BaseModel: T | [], id: number) {
    return {}
  }

  // editVehicle(vehicle: Vehicle): Promise<Vehicle> {
  //   return lastValueFrom(this.http.put<Vehicle>(`${environment.apiVehicles}/${vehicle.id}`, vehicle));
  // }

  public delete(id: number): boolean {
    return true;
  }

  // deleteVehicle(vehicle: Vehicle): Promise<Vehicle> {
  //   return lastValueFrom(this.http.delete<Vehicle>(`${environment.apiVehicles}/${vehicle.id}`));
  // }

  protected handleResponse(response: LoopApiResponse<T>) {
    if(response.success) {
      return response.data
    } else {
      throw new Error("Api 200, mas success falso");
    }
  }
}
