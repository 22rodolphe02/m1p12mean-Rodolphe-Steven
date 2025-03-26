import { Injectable } from '@angular/core';
import { ResourceService } from '../../../core/services/resource.service';
import { Mechanic } from '../models/mechanic.model';
import { HttpClient } from '@angular/common/http';

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
    const valeur = this.http.get<{ nombreMecanicien : number }>(url);
    return valeur;
  }

}
