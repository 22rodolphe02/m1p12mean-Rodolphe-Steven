import {Component, ResourceRef} from '@angular/core';
import {ServiceListComponent} from '../../components/service-list/service-list.component';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {Dialog} from 'primeng/dialog';
import {ServiceAddComponent} from '../../components/service-add/service-add.component';
import {catchError, map, Observable, of} from 'rxjs';
import {Service} from '../../models/service.model';
import {ServiceService} from '../../services/service.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import {ApiResponse} from '../../../../core/models/response.model';
import {rxResource} from '@angular/core/rxjs-interop';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'g-service-list-page',
  imports: [
    CommonModule,
    ServiceListComponent,
    Button,
    RouterLink,
    PaginationComponent,
    Dialog,
    ServiceAddComponent,
    ServiceAddComponent,
    LoaderComponent
  ],
  templateUrl: './service-list-page.component.html',
  styleUrl: './service-list-page.component.scss'
})
export class ServiceListPageComponent {

  createMode: boolean = false;

  services: ResourceRef<ApiResponse<Service[]> | undefined> = rxResource({
    loader: () => this.serviceService.getAll()
  });

  constructor(private serviceService: ServiceService) {
  }

  servicesData(): ApiResponse<Service[]>{

    return this.services.value()!;
  }

  create(){
    this.createMode = true;

    console.log("salut")
  }

  isSave(state: boolean) {
    this.createMode = !state;
  }
}
