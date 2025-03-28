import { Injectable } from '@angular/core';
import {ResourceService} from '../../../core/services/resource.service';
import {Appointment, AppointmentCreate} from '../models/appointment.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends ResourceService<Appointment, AppointmentCreate>{

  constructor(http: HttpClient) {
    super(http);
    this.setApiUrl('rendezvous')
  }
}
