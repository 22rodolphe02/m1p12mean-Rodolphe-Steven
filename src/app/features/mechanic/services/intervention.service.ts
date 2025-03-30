import { Injectable } from '@angular/core';
import { ResourceService } from '../../../core/services/resource.service';
import { Mechanic } from '../models/mechanic.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class InterventionService extends ResourceService<User> {
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
}
