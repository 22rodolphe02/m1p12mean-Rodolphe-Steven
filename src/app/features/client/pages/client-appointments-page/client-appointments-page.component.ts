import { Component } from '@angular/core';
import {AppointmentListComponent} from '../../../appointment/components/appointment-list/appointment-list.component';
import {PlanningPageComponent} from '../../../appointment/pages/planning-page/planning-page.component';
import {Button} from 'primeng/button';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {RouterLink} from '@angular/router';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'g-client-appointments-page',
  imports: [
    AppointmentListComponent,
    Button,
    PaginationComponent,
    RouterLink,
  ],
  templateUrl: './client-appointments-page.component.html',
  styleUrl: './client-appointments-page.component.scss'
})
export class ClientAppointmentsPageComponent {

}
