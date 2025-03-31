import { Injectable } from '@angular/core';
import {Intervention, ServicePerformed} from '../models/intervention.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResourceService} from '../../../core/services/resource.service';
import {Service} from '../../service/models/service.model';

@Injectable({
  providedIn: 'root'
})
export class InterventionService extends ResourceService<Intervention>{

  constructor(http: HttpClient) {
    super(http); // 🔹 Passer 'clients' en argument ici
    this.setApiUrl("interventions")
  }


  public getInterventions(filters: { [key: string]: string }, sort: string, pagination: { page: number, limit: number }): Observable<Intervention[]>{
    return this.filteredInterventions(filters, sort, pagination)
  }


  /*
  * GET /interventions?filter=status:active,age:gt:30&sort=nom:asc&page=2&limit=10
  * */
  public filteredInterventions(filters: { [key: string]: string }, sort: string, pagination: { page: number, limit: number }, url?: string): Observable<Intervention[]>{
    const preparedUrl = `${this.apiUrl}${url}`

    let params = new HttpParams();

    // Ajouter les filtres
    if (filters) {
      Object.keys(filters).forEach(key => {
        params = params.append('filter', `${key}:${filters[key]}`);
      });
    }

    // Ajouter le tri
    if (sort) {
      params = params.set('sort', sort);
    }

    // Ajouter la pagination
    params = params.set('page', pagination.page.toString()).set('limit', pagination.limit.toString());

    return this.http.get<Intervention[]>(preparedUrl, { params });
    // return this.getAll(params)


  }

  public getTotalEstimationTime(intervention: Intervention): number{
    let time = 0
    const services: ServicePerformed[] | undefined = intervention.services;
    if (services){
      for (const service of services) {
        time += service.duree
      }
    }

    return time;

  }

}
