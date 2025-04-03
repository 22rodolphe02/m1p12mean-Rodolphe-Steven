import { Component } from '@angular/core';
import {PlanningComponent} from '../../../appointment/components/planning/planning.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AppointmentDetailsComponent} from '../../../appointment/components/appointment-details/appointment-details.component';
import {AppointmentListComponent} from '../../../appointment/components/appointment-list/appointment-list.component';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {Button} from 'primeng/button';
import {AppointmentService} from '../../../appointment/services/appointment.service';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {Appointment} from '../../../appointment/models/appointment.model';
import {tap} from 'rxjs/operators';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'g-planning-page',
  imports: [
    AppointmentListComponent,
    PaginationComponent,
    Button,
    LoaderComponent,
    AsyncPipe
  ],
  templateUrl: './admin-appointments-list-page.component.html',
  styleUrl: './admin-appointments-list-page.component.scss'
})
export class AdminAppointmentsListPageComponent {

  appointments$ !: Observable<ApiResponse<Appointment[]>>;

  loading: boolean = true;

  currentPage = 1;

  constructor(private appointmentService: AppointmentService) {
    this.loadAppointment();
  }


  loadAppointment(){
    this.appointments$ = this.appointmentService.getAll(undefined, {index: this.currentPage, limit: 10}).pipe(
      tap(value => {
      }),
      catchError(error => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    )
  }

  onPageChange(index: number) {
    this.currentPage = index;
    this.loadAppointment();
  }
}
