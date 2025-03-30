import { Injectable } from '@angular/core';
import { ResourceService } from '../../../core/services/resource.service';
import { Mechanic } from '../models/mechanic.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../core/models/user.model';

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
}
