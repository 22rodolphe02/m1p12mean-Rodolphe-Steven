import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {KpiCardComponent} from "../../../../shared/components/kpi-card/kpi-card.component";
import {Kpi} from '../../../../core/models/kpi.model';
import { HttpClient } from '@angular/common/http';
import { MechanicService } from '../../../mechanic/services/mechanic.service';
@Component({
  selector: 'g-kpi-general',
    imports: [
        Button,
        KpiCardComponent,
    ],
  templateUrl: './kpi-general.component.html',
  styleUrl: './kpi-general.component.scss'
})
export class KpiGeneralComponent {

  constructor(
    private mechanicService : MechanicService
  ){
    this.setMechanicDataNumber();
  }

  mechanicData : Kpi[] = []

  interventionData: Kpi[] = [
    { value: 20, label: 'En cours', color: 'primary' },
    { value: 3, label: 'En attente', color: 'warning' },
    { value: 6, label: 'Terminés', color: 'success' }
  ];

  setMechanicDataNumber(){
    this.mechanicService.getNombreMechanic().subscribe((data : { nombreMecanicien : number }) => {
      this.mechanicData = [{ value: data.nombreMecanicien }]
     });
  }

  // mechanicData: Kpi[] = [
  //   { value: 4, label: 'Occupé', color: 'danger' },
  //   { value: 6, label: 'Libre', color: 'success' }
  // ]

  appointmentData: Kpi[] = [
    {
      value: 25, label: ''
    }
  ]
}
