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
import {StatsResponse} from '../../mechanic/models/statsforcharts.model';

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

  public getHistoriesByClient(clientId: string, page: {index: number, limit: number} = {index: 1, limit: 5}): Observable<ApiResponse<Intervention[]>>{
    let params = new HttpParams();
    params = params
        .set('page', page.index.toString())
        .set('limit', page.limit.toString());
    const preparedUrl = `${this.apiUrl}/histories/clients/${clientId}`;

    return this.http.get<ApiResponse<Intervention[]>>(preparedUrl, {params});
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

  getNombreInterventionParEtat() {
    const url = this.apiUrl + '/interventionNumberParEtat';
    return this.http.get<{
      success: boolean;
      data: { encours: number; facturee: number; terminee: number; enattente: number }
      message: string;
    }>(url);
  }

  getAllIntervention(){
    const url = this.apiUrl + '/interventionEnCours';
    return this.http.get<{
      success: boolean;
      data: { encours: number; facturee: number; terminee: number; enattente: number } // change ici car je le prends ici
      message: string;
    }>(url);
  }

  getLatestFive(): Observable<ApiResponse<Intervention[]>>{
    const preparedUrl = `${this.apiUrl}/latest-five`;

    return this.http.get<ApiResponse<Intervention[]>>(preparedUrl);
  }

  getOngoingInterventions() {
    const url = this.apiUrl + '/getOngoingInterventionForDashboard';
    return this.http.get<{ success: boolean; data: Intervention[] }>(url);
  }

  getStatsForChartPie() {
    const url = this.apiUrl + '/statChiffreAffaireByService/montant';
    return this.http.get<StatsResponse>(url);
  }

  getStatsForChartBar() {
    const url = this.apiUrl + '/statChiffreAffaireByService/pourcentage';
    return this.http.get<StatsResponse>(url);
  }

  getTotalRevenueService() {
    const url = this.apiUrl + '/totalRevenueService';
    return this.http.get<{ success: boolean, data: { chiffreAffaire: string }, message: string }>(url);
  }

  getTotalRevenueToday() {
    const url = this.apiUrl + '/totalRevenueToday';
    return this.http.get<{ success: boolean, data: { chiffreAffaire: string }, message: string }>(url);
  }

    addPiece(data: {pieceId: string, quantite: number, interventionId: string}): Observable<ApiResponse<InterventionDetail>> {
      const preparedUrl = `${this.apiUrl}/ajouterPiece`;

      return this.http.post<ApiResponse<InterventionDetail>>(preparedUrl, data)
    }

  validatePiece(data: {pieceId: string, interventionId: string}): Observable<ApiResponse<InterventionDetail>> {
    const preparedUrl = `${this.apiUrl}/approuverPiece`;

    return this.http.post<ApiResponse<InterventionDetail>>(preparedUrl, data)
  }
}
