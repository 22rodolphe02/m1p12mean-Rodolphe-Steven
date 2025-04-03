import { Component } from '@angular/core';
import {AsyncPipe, Location} from '@angular/common';
import {Button} from 'primeng/button';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {VehicleDetailsComponent} from '../../../vehicle/components/vehicle-details/vehicle-details.component';
import {catchError, finalize, map, Observable} from 'rxjs';
import {VehicleDetail} from '../../../vehicle/models/vehicle.model';
import {InterventionService} from '../../services/intervention.service';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'g-intervention-details-page',
  imports: [
    AsyncPipe,
    Button,
    LoaderComponent,
    VehicleDetailsComponent
  ],
  templateUrl: './intervention-details-page.component.html',
  styleUrl: './intervention-details-page.component.scss'
})
export class InterventionDetailsPageComponent {
  interventionId!: string;

  combinedData$!: Observable<VehicleDetail>;

  loading: boolean = false;

  constructor(private interventionService: InterventionService,
              private route: ActivatedRoute,
              private location: Location,
              private messageService: MessageService) {

    this.route.params.subscribe( params => {
      this.interventionId = params['interventionId'];
    })

    this.loadData();
    // this.getIntervention();
  }


  loadData() {
    this.loading = true;

    this.combinedData$ = this.interventionService.getDetailsById(this.interventionId).pipe(
      map(vehicleResponse => ({
        info: vehicleResponse.data.vehicle,
        intervention: vehicleResponse.data
      } as VehicleDetail)),
      catchError(err => {

        const message = 'Erreur lors du chargement des interventions';
        this.messageService.add({severity: 'error', detail: message, sticky: true, closable: true});
        throw err;
      }),
      finalize(() => {
        this.loading = false;
      })
    );
  }

  back() {
    this.location.back();
  }
}
