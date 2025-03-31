import { Injectable } from '@angular/core';
import { ResourceService } from '../../../core/services/resource.service';
import { Mechanic } from '../models/mechanic.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../core/models/user.model';
import { Intervention } from '../../interventions/models/intervention.model';
import { StatsResponse } from '../models/statsforcharts.model';

@Injectable({
  providedIn: 'root',
})
export class InterventionService extends ResourceService<Intervention> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setApiUrl('interventions');
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
}
