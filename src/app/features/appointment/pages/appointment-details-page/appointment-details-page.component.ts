import {Component} from '@angular/core';
import {Appointment} from '../../models/appointment.model';
import {AsyncPipe, Location} from '@angular/common';
import {Button} from 'primeng/button';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {catchError, finalize, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from 'primeng/api';
import {AppointmentService} from '../../services/appointment.service';
import {ApiResponse} from '../../../../core/models/response.model';
import {AppointmentDetailsComponent} from '../../components/appointment-details/appointment-details.component';

@Component({
  selector: 'g-appointment-details-page',
  imports: [
    AsyncPipe,
    Button,
    LoaderComponent,
    AppointmentDetailsComponent
  ],
  templateUrl: './appointment-details-page.component.html',
  styleUrl: './appointment-details-page.component.scss'
})
export class AppointmentDetailsPageComponent {

  appointmentId!: string;

  appointment$!: Observable<ApiResponse<Appointment>>;

  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private appointmentService: AppointmentService,
              private messageService: MessageService,
              private location: Location) {

    this.route.params.subscribe( params => {
      this.appointmentId = params['appointmentId'];
    })

    this.loadData();
  }


  loadData() {
    this.loading = true;

    this.appointment$ = this.appointmentService.getDetails(this.appointmentId).pipe(
      catchError(err => {

        const message = 'une erreur s\'est produite du côté serveur';
        this.messageService.add({severity: 'error', detail: message, sticky: true, closable: true});
        this.location.back();
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
