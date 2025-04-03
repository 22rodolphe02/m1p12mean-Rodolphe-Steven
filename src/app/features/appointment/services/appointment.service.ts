import {Injectable} from '@angular/core';
import {ResourceService} from '../../../core/services/resource.service';
import {Appointment, AppointmentCreate, AppointmentStatus} from '../models/appointment.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../core/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends ResourceService<Appointment, AppointmentCreate>{

  constructor(http: HttpClient) {
    super(http);
    this.setApiUrl('rendezvous')
  }

  confirm(appointmentId: string): Observable<ApiResponse<Appointment>>{
    const preparedUrl = `${this.apiUrl}/confirmer/${appointmentId}`

    return this.http.post<ApiResponse<Appointment>>(preparedUrl, {});
  }

  canceled(appointmentId: string): Observable<ApiResponse<Appointment>> {
    const preparedUrl = `${this.apiUrl}/annuler/${appointmentId}`

    return this.http.put<ApiResponse<Appointment>>(preparedUrl, {});
  }


  getAllByClientId(clientId: string | number, page: {index: number, limit: number} = {index: 1, limit: 10}):
    Observable<ApiResponse<Appointment[]>>{
    const preparedUrl = `${this.apiUrl}/info/clients/${clientId}`

    let params = new HttpParams();
    params = params
      .set('page', page.index.toString())
      .set('limit', page.limit.toString());

    return this.http.get<ApiResponse<Appointment[]>>(preparedUrl, {params})
  }

  getAllByMechanicId(clientId: string | number, page: {index: number, limit: number} = {index: 1, limit: 10}):
    Observable<ApiResponse<Appointment[]>>{
    const preparedUrl = `${this.apiUrl}/info/mechanics/${clientId}`

    let params = new HttpParams();
    params = params
      .set('page', page.index.toString())
      .set('limit', page.limit.toString());

    return this.http.get<ApiResponse<Appointment[]>>(preparedUrl, {params})
  }

  override getAll(params?: HttpParams, page: { index: number; limit: number } = {
    index: 1,
    limit: 10
  }): Observable<ApiResponse<Appointment[]>> {

    const preparedUrl = `${this.apiUrl}/info`

    params = params || new HttpParams();
    params = params
      .set('page', page.index.toString())
      .set('limit', page.limit.toString());

    return this.http.get<ApiResponse<Appointment[]>>(preparedUrl, {params})
  }

  getStatusClass(status: AppointmentStatus): string{
    if (status === AppointmentStatus.PENDING){
      return "warning"
    }else if (status === AppointmentStatus.CONFIRMED){
      return "success"
    }else if (status === AppointmentStatus.CANCELLED){
      return "danger"
    }

    return "primary";
  }

  getDetails(id: string): Observable<ApiResponse<Appointment>> {
    const preparedUrl = `${this.apiUrl}/detail/${id}`

    return this.http.get<ApiResponse<Appointment>>(preparedUrl)
  }
}
