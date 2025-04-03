import {Component, effect, model} from '@angular/core';
import {CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';
import {Button} from 'primeng/button';
import {Appointment, AppointmentStatus} from '../../models/appointment.model';
import {AppointmentService} from '../../services/appointment.service';
import {MessageService} from 'primeng/api';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiResponse} from '../../../../core/models/response.model';
import {AuthService} from '../../../../core/auth/auth.service';
import {Role} from '../../../../core/models/user.model';

@Component({
  selector: 'g-appointment-details',
  imports: [
    DatePipe,
    Button,
    CurrencyPipe,
    DecimalPipe
  ],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent {
  data = model.required<Appointment>();

  showConfirmButton: boolean = true;
  showCanceledButton: boolean = true;

  constructor(private appointmentService: AppointmentService,
              private messageService: MessageService,
              private authService: AuthService) {

    effect(() => {
      this.setActionButtonState();
    });
  }

  getStatusClass(status: AppointmentStatus) {
    return this.appointmentService.getStatusClass(status);
  }

  setActionButtonState(): void{
    const status: AppointmentStatus = this.data().status;
    if (status === AppointmentStatus.CANCELLED ){
      this.showCanceledButton = false;
    } else if (status === AppointmentStatus.CONFIRMED){
      this.showConfirmButton = false;
    }

  }

  isMechanic(): boolean{
    const role = this.authService.getRole();
    return role === Role.MECHANICAL;

  }

  canceled(){
    this.appointmentService.canceled(this.data()._id as string).subscribe({
      next: (value) => {
        if (value.success){
          this.data.set(value.data);
          this.messageService.add({severity: 'success', detail: value.message})
        }else{
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: value.message, sticky: true, closable: true})
        }
      },
      error: (err: HttpErrorResponse) => {
        const response = err.error as ApiResponse<any>
        this.messageService.add({severity: 'error', detail: response.message, sticky: true, closable: true})
        throw err;
      }
    })
  }

  validate() {
    this.appointmentService.confirm(this.data()._id as string).subscribe({
      next: (value) => {
        if (value.success){
          this.data.set(value.data);
          this.messageService.add({severity: 'success', detail: value.message})
        }else{
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: value.message, sticky: true, closable: true})
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log("err ==== ", )
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: err.error.message, sticky: true, closable: true})
        throw err;
      }
    })
  }
}
