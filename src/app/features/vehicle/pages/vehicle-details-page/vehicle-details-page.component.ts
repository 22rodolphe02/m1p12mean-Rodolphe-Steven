import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {VehicleInfoComponent} from '../../components/vehicle-info/vehicle-info.component';
import {
  Intervention,
  InterventionStatus,
  ServicePerformedStatus
} from '../../../interventions/models/intervention.model';
import {Role, User} from '../../../../core/models/user.model';
import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {InterventionService} from '../../../interventions/services/intervention.service';

@Component({
  selector: 'g-vehicle-details-page',
  imports: [
    Button,
    RouterLink,
    VehicleInfoComponent,
    CurrencyPipe,
    DecimalPipe
  ],
  templateUrl: './vehicle-details-page.component.html',
  styleUrl: './vehicle-details-page.component.scss'
})
export class VehicleDetailsPageComponent {

  intervention!: Intervention;

  constructor(private interventionService: InterventionService) {
    this.fakeIntervention();
  }

  getEstimateTime(intervention: Intervention){
    return this.interventionService.getTotalEstimationTime(intervention);
  }

  fakeIntervention(){

    const user: User ={
      _id: 1,
      email: 'sc@gmail.com',
      nom: 'test',
      token: 'sfknfngejt.314fsfvgf',
      motdepasse: 'testPassword',
      registrationDate: new Date(),
      role: Role.ADMIN,
      prenom: 'Test'
    }

    let intervention: Intervention = {
      _id: 1,
      estimateTime: 240,
      client: user,
      status: InterventionStatus.IN_PROGRESS,
      mecanicien: user,
      services: [],
      pieces: []
    }

    for (let i = 0; i < 4; i++) {
      intervention.pieces.push({
        _id: '1',
        nom: 'Par à choque',
        prixUnitaire: 4000,
        quantite: 1,
      })

      intervention.services?.push({
        _id: '411',
        nom: 'Service1',
        etat: ServicePerformedStatus.IN_PROGRESS,
        description: 'Réparation pneu',
        prix: 7000,
        duree: 40,
      })
    }

    this.intervention = intervention;


  }
}
