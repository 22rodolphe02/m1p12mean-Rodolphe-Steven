import { Injectable } from '@angular/core';
import {Client} from '../models/client.model';
import {ResourceService} from '../../../core/services/resource.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../core/models/response.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends ResourceService<Client>{

  constructor(http: HttpClient) {
    super(http);
    this.setApiUrl("users")
  }

  override getAll(params?: HttpParams, page: { index: number; limit: number } = {
    index: 1,
    limit: 10
  }): Observable<ApiResponse<Client[]>> {
    const preparedUrl = `${environment.apiUrl}/users/clients`

    params = params || new HttpParams();
    params = params
      .set('page', page.index.toString())
      .set('limit', page.limit.toString());
    // }
    return this.http.get<ApiResponse<Client[]>>(preparedUrl, {params});
  }

  // getAllClient(page: { index: number; limit: number }) {
  //   this.apiUrl = `${environment.apiUrl}/users/clients`;
  //
  // }
}
