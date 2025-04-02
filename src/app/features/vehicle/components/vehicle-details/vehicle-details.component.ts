import {Component, model} from '@angular/core';
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
import {MessageService} from 'primeng/api';
import {tap} from 'rxjs/operators';
import {catchError} from 'rxjs';


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
  data = model.required<VehicleDetail>();

  constructor(private interventionService: InterventionService,
              private authService: AuthService,
              private messageService: MessageService) {
  }

  isOwner(){
    const role = this.authService.getRole();
    return role === Role.MECHANICAL;

  }

  showing(status: ServicePerformedStatus){
    return this.isOwner() && status === ServicePerformedStatus.IN_PROGRESS;

  }

  getStatusClass(status: InterventionStatus){
    return  this.interventionService.getStatusClass(status)
  }

  getServiceStatusClass(status: ServicePerformedStatus){
    return this.interventionService.getStatusServiceClass(status)
  }

  getIntervention(): InterventionDetail | undefined{
    console.log("----- data = ", this.data())
    return this.data().intervention;
  }

  markAsFinish(serviceId: string | number) {
    const interventionId: string = this.getIntervention()!._id as string;
    this.interventionService.markAsFinish({interventionId: interventionId, serviceId: serviceId as string}).subscribe({
      next: (response) => {
        if (response.success){
          this.messageService.add({severity: "success", detail: response.message, life: 4000})
          const details: VehicleDetail = {
            intervention: response.data,
            info: response.data.vehicle
          }

          console.log("intervention === ", details.intervention)

          this.data.set(details)
        }
      },
      error: err => {
        this.messageService.add({severity: 'danger', detail: 'une erreur s\'est produite ', sticky: true, closable: true})
        throw err;
      }
    })
  }
}
