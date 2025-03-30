import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { KpiCardComponent } from '../../../../shared/components/kpi-card/kpi-card.component';
import { Kpi } from '../../../../core/models/kpi.model';
import { HttpClient } from '@angular/common/http';
import { MechanicService } from '../../../mechanic/services/mechanic.service';
import { RendezvousService } from '../../../mechanic/services/rendezvous.service';
import { PieceService } from '../../../mechanic/services/piece.service';
import { InterventionService } from '../../../mechanic/services/intervention.service';
@Component({
  selector: 'g-kpi-general',
  imports: [Button, KpiCardComponent],
  templateUrl: './kpi-general.component.html',
  styleUrl: './kpi-general.component.scss',
})
export class KpiGeneralComponent {
  constructor(
    private mechanicService: MechanicService,
    private rendezVousService: RendezvousService,
    private pieceService: PieceService,
    private interventionService: InterventionService
  ) {
    this.setMechanicDataNumber();
  }

  mechanicData: Kpi[] = [];

  interventionData: Kpi[] = [
    { value: 20, label: 'En cours', color: 'primary' },
    { value: 3, label: 'En attente', color: 'warning' },
    { value: 6, label: 'Terminés', color: 'success' },
    { value: 6, label: 'Facturés', color: 'success' },
  ];

  appointmentData: Kpi[] = [
    {
      value: 25,
      label: '',
    },
  ];

  pieceData: Kpi[] = [
    {
      value: 25,
      label: '',
    },
  ];

  ngOnInit(): void {
    this.setAppoitmentData();
    this.setMechanicDataNumber();
    this.setPieceData();
    this.setInterventionData();
  }

  setMechanicDataNumber() {
    this.mechanicService
      .getNombreMechanic()
      .subscribe((data: { data: number }) => {
        this.mechanicData = [{ value: data.data }];
      });
  }

  setAppoitmentData() {
    this.rendezVousService
      .getNombreRendezVous()
      .subscribe((data: { data: any[] }) => {
        this.appointmentData = [{ value: data.data.length }];
      });
  }

  setPieceData() {
    this.pieceService.getNombrePieceEnRupture().subscribe(
      (data) => {
        this.pieceData = [{ value: data.data.nombre }];
      },
      (error) => {
        console.error('Erreur API :', error);
      }
    );
  }

  setInterventionData() {
    this.interventionService.getNombreInterventionParEtat().subscribe(
      (data) => {
        console.log('Données reçues :', data); // Vérifier la structure de la réponse
        this.interventionData = [
          { value: data.data.encours, label: 'En cours', color: 'primary' },
          { value: data.data.enattente, label: 'En attente', color: 'warning' },
          { value: data.data.terminee, label: 'Terminés', color: 'success' },
          { value: data.data.facturee, label: 'Facturés', color: '#007bff' },
        ];
        console.log(
          'Nouvelle valeur de interventionData :',
          this.interventionData
        );
      },
      (error) => {
        console.error('Erreur API :', error);
      }
    );
  }
}
