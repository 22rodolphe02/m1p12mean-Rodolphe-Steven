import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {
  InterventionDetail
} from '../../../interventions/models/intervention.model';
import {AsyncPipe, Location} from '@angular/common';
import {InterventionService} from '../../../interventions/services/intervention.service';
import {catchError, finalize, map, Observable, of, switchMap} from 'rxjs';
import {MessageService} from 'primeng/api';
import {VehicleDetailsComponent} from '../../../vehicle/components/vehicle-details/vehicle-details.component';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {VehicleDetail} from "../../../vehicle/models/vehicle.model";
import {VehicleService} from "../../../vehicle/services/vehicle.service";

@Component({
  selector: 'g-client-vehicle-details-page',
  imports: [
    Button,
    VehicleDetailsComponent,
    LoaderComponent,
    AsyncPipe
  ],
  providers: [AsyncPipe],
  templateUrl: './client-vehicle-details-page.component.html',
  styleUrl: './client-vehicle-details-page.component.scss'
})
export class ClientVehicleDetailsPageComponent {

  vehicleId!: string;

  combinedData$!: Observable<VehicleDetail>;

  loading: boolean = false;

  constructor(private interventionService: InterventionService,
              private route: ActivatedRoute,
              private vehicleService: VehicleService,
              private messageService: MessageService,
              private location: Location) {

    this.route.params.subscribe( params => {
      this.vehicleId = params['id'];
      console.log("vehicles id === ", this.vehicleId)
    })

    this.loadData();
    // this.getIntervention();
  }


  loadData() {
    this.loading = true;

    this.combinedData$ = this.interventionService.getLatestByVehicleId(this.vehicleId).pipe(
      switchMap(interventionResponse => {
        console.log("intervention response ==== ", interventionResponse)
        if (interventionResponse.data) {

          return of(this.toDetails(interventionResponse.data));
        } else {

          return this.vehicleService.getById(this.vehicleId).pipe(
            map(vehicleResponse => ({
              info: vehicleResponse.data
            } as VehicleDetail))
          );
        }
      }),
      catchError(err => {

        const message = 'Erreur lors du chargement des interventions';
        this.messageService.add({severity: 'error', detail: message, sticky: true, closable: true});

        return this.vehicleService.getById(this.vehicleId).pipe(
          map(vehicleResponse => ({
            info: vehicleResponse.data
          } as VehicleDetail))
        );
      }),
      finalize(() => {
        this.loading = false;
      })
    );
  }

  toDetails(detail: InterventionDetail): VehicleDetail {
    return {
      info: detail.vehicle,
      intervention: detail
    };
  }

  back() {
    this.location.back();
  }
}
