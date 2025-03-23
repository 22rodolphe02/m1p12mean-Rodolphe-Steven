import {Component, Input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Appointment, AppointmentStatus} from '../../models/appointment.model';
import {Button} from 'primeng/button';

@Component({
  selector: 'g-appointment-list',
  imports: [
    DatePipe,
    Button
  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent {
  numbers: number[] = []
  dateTest: Date = new Date();

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

    this.appointments = [
      {
        id: 1,
        start: new Date(),
        end: new Date(),
        status: AppointmentStatus.PENDING,
        clientName: 'Johann bris',
      },
      {
        id: 2,
        start: new Date('2025-03-26 10:00:00'),
        end: new Date('2025-03-26 12:00:00'),
        status: AppointmentStatus.CONFIRMED,
        clientName: 'Johann bris',
        mechanical: 'John Billing'
      },
      {
        id: 3,
        start: new Date(),
        end: new Date(),
        status: AppointmentStatus.CANCELLED,
        clientName: 'Reparation pneu',
      },
      {
        id: 4,
        start: new Date(),
        end: new Date(),
        status: AppointmentStatus.CANCELLED,
        clientName: 'Reparation pneu',
      },
      {
        id: 5,
        start: new Date(),
        end: new Date(),
        status: AppointmentStatus.PENDING,
        clientName: 'Reparation pneu',
      }
    ]
  }

  checkAssignation(appointment: Appointment): boolean{
    return ((!appointment.mechanical && appointment.status == AppointmentStatus.PENDING) || appointment.status == AppointmentStatus.PENDING);

  }

  // protected readonly AppointmentStatus = AppointmentStatus;
}
