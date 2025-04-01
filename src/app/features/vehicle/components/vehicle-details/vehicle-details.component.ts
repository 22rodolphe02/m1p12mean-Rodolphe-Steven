import {Component, input} from '@angular/core';
import {
  InterventionDetail,
  InterventionStatus,
  ServicePerformedStatus
} from '../../../interventions/models/intervention.model';
import {Button} from 'primeng/button';
import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {VehicleInfoComponent} from '../vehicle-info/vehicle-info.component';
import {InterventionService} from '../../../interventions/services/intervention.service';
import {VehicleDetail} from '../../models/vehicle.model';
import {AuthService} from '../../../../core/auth/auth.service';
import {Role} from '../../../../core/models/user.model';


@Component({
  selector: 'g-vehicle-details',
  imports: [
    Button,
    CurrencyPipe,
    DecimalPipe,
    VehicleInfoComponent,
  ],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.scss'
})
export class VehicleDetailsComponent {
  data = input.required<VehicleDetail>();

  constructor(private interventionService: InterventionService,
              private authService: AuthService) {
    // this.fakeIntervention();
    // console.log("dat")
  }

  isOwner(){
    const role = this.authService.getRole();
    return role === Role.MECHANICAL;

  }

  getStatusClass(status: InterventionStatus){
    return  this.interventionService.getStatusClass(status)
  }

  getServiceStatusClass(status: ServicePerformedStatus){
    return this.interventionService.getStatusServiceClass(status)
  }

  getIntervention(): InterventionDetail | undefined{
    return this.data().intervention;
  }
}
