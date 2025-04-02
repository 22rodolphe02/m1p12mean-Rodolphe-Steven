import { Component } from '@angular/core';
import {AppointmentListComponent} from '../../../appointment/components/appointment-list/appointment-list.component';
import {AdminAppointmentsListPageComponent} from '../../../admin/pages/admin-appointments-list-page/admin-appointments-list-page.component';
import {Button} from 'primeng/button';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {RouterLink} from '@angular/router';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {VehicleStatus} from '../../../vehicle/models/vehicle.model';
import {Appointment} from '../../../appointment/models/appointment.model';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {AppointmentService} from '../../../appointment/services/appointment.service';
import {AsyncPipe} from '@angular/common';
import {VehicleListComponent} from '../../../vehicle/components/vehicle-list/vehicle-list.component';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../../../core/auth/auth.service';
import {User} from '../../../../core/models/user.model';

@Component({
  selector: 'g-client-appointments-page',
  imports: [
    AppointmentListComponent,
    Button,
    PaginationComponent,
    RouterLink,
    AsyncPipe,
    LoaderComponent,
  ],
  providers: [AsyncPipe],
  templateUrl: './client-appointments-page.component.html',
  styleUrl: './client-appointments-page.component.scss'
})
export class ClientAppointmentsPageComponent {

  appointments$!: Observable<ApiResponse<Appointment[]>>
  currentPage = 1;

  loading: boolean = true;

  constructor(private appointmentService: AppointmentService, private authService: AuthService) {
    this.loadAppointments();
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadAppointments();
  }

  loadAppointments(){

    const user: User | null =  this.authService.getCurrentUser();

    if (user != null){
      this.appointments$ = this.appointmentService.getAllByClientId(user!._id!, {index: this.currentPage, limit: 10}).pipe(
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


  }
}
