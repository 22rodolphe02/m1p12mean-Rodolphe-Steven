import { Injectable } from '@angular/core';
import { ResourceService } from '../../../core/services/resource.service';
import { Mechanic } from '../models/mechanic.model';
import { HttpClient } from '@angular/common/http';
import {ResourceService} from '../../../core/services/resource.service';
import {User} from '../../../core/models/user.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../core/models/response.model';
import {Client} from '../../client/models/client.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MechanicService extends ResourceService<Mechanic> {

  constructor(httpClient : HttpClient) {
    super(httpClient);
    this.setApiUrl('users');
  }

  getNombreMechanic(){
    const url = this.apiUrl + "/nombremecanicien";
    const valeur = this.http.get<{ success: boolean, data: number, message: string }>(url);
    return valeur;
  }
  override getAll(params?: HttpParams, page: { index: number; limit: number } = {
    index: 1,
    limit: 10
  }): Observable<ApiResponse<Client[]>> {
    const preparedUrl = `${environment.apiUrl}/users/mechanics`

    params = params || new HttpParams();
    params = params
      .set('page', page.index.toString())
      .set('limit', page.limit.toString());
    // }
    return this.http.get<ApiResponse<Client[]>>(preparedUrl, {params});
  }
}
