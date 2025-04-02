import {Component, Input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Appointment, AppointmentStatus} from '../../models/appointment.model';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'g-appointment-list',
  imports: [
    DatePipe,
    RouterLink,
  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent {
  numbers: number[] = []

  @Input({alias: 'data'}) appointments: Appointment[] = []


  constructor() {
    this.numbers = Array.from(Array(6).keys()).map(i => i + 1);
    this.fakeData();
  }

  getClass(status: AppointmentStatus): string{
    if (status === AppointmentStatus.CANCELLED){
      return  'danger'
    }else if(status === AppointmentStatus.CONFIRMED){
      return 'success'
    }

    return 'primary'
  }

  fakeData(){

    // this.appointments = [
    //   {
    //     _id: 1,
    //     start: new Date(),
    //     end: new Date(),
    //     statut: AppointmentStatus.PENDING,
    //     clientName: 'Johann bris',
    //   },
    //   {
    //     _id: 2,
    //     start: new Date('2025-03-26 10:00:00'),
    //     end: new Date('2025-03-26 12:00:00'),
    //     statut: AppointmentStatus.CONFIRMED,
    //     clientName: 'Johann bris',
    //     mechanical: 'John Billing'
    //   },
    //   {
    //     _id: 3,
    //     start: new Date(),
    //     end: new Date(),
    //     statut: AppointmentStatus.CANCELLED,
    //     clientName: 'Reparation pneu',
    //   },
    //   {
    //     _id: 4,
    //     start: new Date(),
    //     end: new Date(),
    //     statut: AppointmentStatus.CANCELLED,
    //     clientName: 'Reparation pneu',
    //   },
    //   {
    //     _id: 5,
    //     start: new Date(),
    //     end: new Date(),
    //     statut: AppointmentStatus.PENDING,
    //     clientName: 'Reparation pneu',
    //   }
    // ]
  }

  // checkAssignation(appointment: Appointment): boolean{
  //   return ((!appointment.mechanical && appointment.statut == AppointmentStatus.PENDING) || appointment.statut == AppointmentStatus.PENDING);
  //
  // }

  // protected readonly AppointmentStatus = AppointmentStatus;
}
