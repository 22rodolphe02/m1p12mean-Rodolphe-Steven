import {Injectable} from '@angular/core';
import {
  Intervention,
  InterventionDetail,
  InterventionStatus,
  ServicePerformedStatus
} from '../models/intervention.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResourceService} from '../../../core/services/resource.service';
import {ApiResponse} from '../../../core/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class InterventionService extends ResourceService<Intervention>{

  constructor(http: HttpClient) {
    super(http); // 🔹 Passer 'clients' en argument ici
    this.setApiUrl("interventions")
  }

  getAllByMechanical(mechanicalId: string, page: {index: number, limit: number} = {index: 1, limit: 10}):
    Observable<ApiResponse<Intervention[]>>{

    let params = new HttpParams();
    params = params
      .set('page', page.index.toString())
      .set('limit', page.limit.toString());

    const preparedUrl = `${this.apiUrl}/mechanics/${mechanicalId}`

    return this.http.get<ApiResponse<Intervention[]>>(preparedUrl, {params})
  }

  public markAsFinish(data: {interventionId: string, serviceId: string}): Observable<ApiResponse<InterventionDetail>>{
    const preparedUrl = `${this.apiUrl}/finirService`;
    return  this.http.post<ApiResponse<InterventionDetail>>(preparedUrl, data);
  }


  public getInterventions(filters: { [key: string]: string }, sort: string, pagination: { page: number, limit: number }): Observable<Intervention[]>{
    return this.filteredInterventions(filters, sort, pagination)
  }


  /*
  * GET /interventions?filter=statut:active,age:gt:30&sort=nom:asc&page=2&limit=10
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

  public getStatusClass(status: InterventionStatus): string{
    if (status === InterventionStatus.DONE){
      return 'primary'
    }else if (status === InterventionStatus.PAID){
      return 'success'
    }else if (status === InterventionStatus.IN_PROGRESS){
      return 'warning'
    }
    return ''
  }

  public getStatusServiceClass(status: ServicePerformedStatus): string{
    if (status === ServicePerformedStatus.DONE){
      return 'success'
    }else if (status === ServicePerformedStatus.IN_PROGRESS){
      return 'warning'
    }
    return ''
  }

  public getDetailsById(id: number | string): Observable<ApiResponse<InterventionDetail>>{
    const preparedUrl = `${this.apiUrl}/details/${id}`;

    return this.http.get<ApiResponse<InterventionDetail>>(preparedUrl);
  }

  public getLatestByVehicleId(vehicleId: number | string): Observable<ApiResponse<InterventionDetail>>{
    const preparedUrl = `${this.apiUrl}/latest/vehicles/${vehicleId}`;

    return this.http.get<ApiResponse<InterventionDetail>>(preparedUrl);
  }

}
