import { Injectable } from '@angular/core';
import {ResourceService} from '../../../core/services/resource.service';
import {Service} from '../models/service.model';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends ResourceService<Service>{

  constructor(http: HttpClient) {
    super(http);
    this.setApiUrl("services")
  }
}
