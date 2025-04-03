import {Component, Input} from '@angular/core';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {VehicleListComponent} from '../../../vehicle/components/vehicle-list/vehicle-list.component';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {catchError, map, Observable, of} from 'rxjs';
import {Vehicle, VehicleStatus} from '../../../vehicle/models/vehicle.model';
import {VehicleService} from '../../../vehicle/services/vehicle.service';
import {AsyncPipe} from '@angular/common';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'g-vehicle-list-page',
  imports: [
    VehicleListComponent,
    PaginationComponent,
    AsyncPipe,
    SelectButton,
    FormsModule
  ],
  templateUrl: './client-vehicle-list-page.component.html',
  styleUrl: './client-vehicle-list-page.component.scss'
})
export class ClientVehicleListPageComponent {

  statusList = Object.values(VehicleStatus)

  filter: string = VehicleStatus.OPERATIONAL

  clientId!: string

  public data$ !: Observable<Vehicle[]>;

  constructor(private vehicleService: VehicleService, private route: ActivatedRoute) {

    this.route.parent?.parent?.params.subscribe(param => {
      this.clientId = param['id']
    })

    this.loadData();
  }

  loadData(){
    // if (!this.clientId){

      // this.data$ = this.vehicleService.getAll().pipe(
      //   map(response => response.success ? response.data : []), // Vérifie si success est true avant d'assigner les données
      //   catchError(() => of([]))
      // );
    // }else{

      this.data$ = this.vehicleService.getAllByClient(this.clientId).pipe(
        map(response => response.success ? response.data : []), // Vérifie si success est true avant d'assigner les données
        catchError(() => of([])) // Gère les erreurs en renvoyant une liste vide
      );
    // }
  }
}
