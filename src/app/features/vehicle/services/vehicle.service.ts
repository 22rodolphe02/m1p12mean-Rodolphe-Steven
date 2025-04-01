import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ResourceService} from '../../../core/services/resource.service';
import {Vehicle} from '../models/vehicle.model';
import {ApiResponse} from '../../../core/models/response.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends ResourceService<Vehicle>{

  constructor(http: HttpClient) {
    super(http);
    this.setApiUrl("vehicles")
  }

  getAllByClient(clientId: number | string, page: {index: number, limit: number} = {index: 1, limit: 10}, params?: HttpParams): Observable<ApiResponse<Vehicle[]>> {
    params = params || new HttpParams();
    params = params
      .set('page', page.index.toString())
      .set('limit', page.limit.toString());

    const preparedUrl = `${this.apiUrl}/clients/${clientId}`;

    console.log(params);

    return this.http.get<ApiResponse<Vehicle[]>>(preparedUrl, {params});
  }


}
