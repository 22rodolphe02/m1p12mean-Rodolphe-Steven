import { Component } from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {VehicleListComponent} from '../../../vehicle/components/vehicle-list/vehicle-list.component';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {VehicleStatus} from '../../../vehicle/models/vehicle.model';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'g-client-vehicles-list-page',
  imports: [
    PaginationComponent,
    VehicleListComponent,
    Button,
    RouterLink,
    SelectButton,
    FormsModule
  ],
  templateUrl: './client-vehicles-list-page.component.html',
  styleUrl: './client-vehicles-list-page.component.scss'
})
export class ClientVehiclesListPageComponent {
  statusList  = Object.values(VehicleStatus);
  filter: string = VehicleStatus.OPERATIONAL;

}
