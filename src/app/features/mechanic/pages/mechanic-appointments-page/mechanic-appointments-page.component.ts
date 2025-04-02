import { Component } from '@angular/core';
import {AppointmentListComponent} from "../../../appointment/components/appointment-list/appointment-list.component";
import {AsyncPipe} from "@angular/common";
import {Button} from "primeng/button";
import {LoaderComponent} from "../../../../shared/components/loader/loader.component";
import {PaginationComponent} from "../../../../shared/components/pagination/pagination.component";
import {RouterLink} from "@angular/router";
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {Appointment} from '../../../appointment/models/appointment.model';
import {AppointmentService} from '../../../appointment/services/appointment.service';
import {AuthService} from '../../../../core/auth/auth.service';
import {User} from '../../../../core/models/user.model';
import {tap} from 'rxjs/operators';
import {
  ClientAppointmentsPageComponent
} from '../../../client/pages/client-appointments-page/client-appointments-page.component';

@Component({
  selector: 'g-mechanic-appointments-page',
  imports: [
    AppointmentListComponent,
    AsyncPipe,
    Button,
    LoaderComponent,
    PaginationComponent,
    RouterLink,
    ClientAppointmentsPageComponent
  ],
  templateUrl: './mechanic-appointments-page.component.html',
  styleUrl: './mechanic-appointments-page.component.scss'
})
export class MechanicAppointmentsPageComponent {

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

  loadAppointments() {

    const user: User | null = this.authService.getCurrentUser();

    if (user != null) {
      this.appointments$ = this.appointmentService.getAllByMechanicId(user!._id!, {
        index: this.currentPage,
        limit: 10
      }).pipe(
        tap(value => {
          // console.log("value ==== ", value)
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
