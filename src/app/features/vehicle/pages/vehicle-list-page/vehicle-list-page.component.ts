import {Component, Input} from '@angular/core';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {VehicleListComponent} from '../../components/vehicle-list/vehicle-list.component';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {catchError, map, Observable, of} from 'rxjs';
import {Vehicle} from '../../models/vehicle.model';
import {VehicleService} from '../../services/vehicle.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-vehicle-list-page',
  imports: [
    InputGroup,
    InputGroupAddon,
    InputText,
    VehicleListComponent,
    PaginationComponent,
    AsyncPipe
  ],
  templateUrl: './vehicle-list-page.component.html',
  styleUrl: './vehicle-list-page.component.scss'
})
export class VehicleListPageComponent {

  @Input() clientId?: number

  public data$ !: Observable<Vehicle[]>;

  constructor(private vehicleService: VehicleService) {
    this.setData();
  }

  setData(){
    if (!this.clientId){

      this.data$ = this.vehicleService.getAll().pipe(
        map(response => response.success ? response.data : []), // Vérifie si success est true avant d'assigner les données
        catchError(() => of([])) // Gère les erreurs en renvoyant une liste vide
      );
    }else{

      this.data$ = this.vehicleService.getAllByClient(this.clientId).pipe(
        map(response => response.success ? response.data : []), // Vérifie si success est true avant d'assigner les données
        catchError(() => of([])) // Gère les erreurs en renvoyant une liste vide
      );
    }
  }
}
