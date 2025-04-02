import { Injectable } from '@angular/core';
import { ResourceService } from '../../../core/services/resource.service';
import { Mechanic } from '../models/mechanic.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../core/models/user.model';
import { map, Observable } from 'rxjs';
import { Planning } from '../../appointment/models/planning.model';

@Injectable({
  providedIn: 'root',
})
export class RendezvousService extends ResourceService<User> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setApiUrl('rendezvous');
  }

  getNombreRendezVous() {
    const url = this.apiUrl;
    const res = this.http.get<{ success: boolean; data: any[]; message: string }>(
      url
    );
    return res;
  }

  getPlanning(): Observable<Planning[]> {
    const url = `${this.apiUrl}/getPlanning`;
    return this.http.get<{ success: boolean; data: Planning[]; message: string }>(url)
      .pipe(
        map(response => response.data) // On s'assure que response.data est bien un tableau
      );
  }
}
