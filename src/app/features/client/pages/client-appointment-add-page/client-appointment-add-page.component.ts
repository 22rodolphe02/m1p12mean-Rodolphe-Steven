import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {ServiceItemComponent} from '../../../service/components/service-item/service-item.component';
import {Service} from '../../../service/models/service.model';
import {DatePicker} from 'primeng/datepicker';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SelectServiceComponent} from '../../components/select-service/select-service.component';
import {Dialog} from 'primeng/dialog';
import {Router, RouterLink} from '@angular/router';
import {AppointmentCreate, AppointmentStatus} from '../../../appointment/models/appointment.model';
import {AppointmentService} from '../../../appointment/services/appointment.service';
import {CommonModule} from '@angular/common';
import {Vehicle} from '../../../vehicle/models/vehicle.model';
import {AuthService} from '../../../../core/auth/auth.service';
import {SelectVehicleComponent} from '../../components/select-vehicle/select-vehicle.component';
import {MessageService} from 'primeng/api';
import {User} from '../../../../core/models/user.model';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'app-client-appointment-add-page',
  imports: [
    CommonModule,
    Button,
    ServiceItemComponent,
    DatePicker,
    ReactiveFormsModule,
    SelectServiceComponent,
    Dialog,
    RouterLink,
    SelectVehicleComponent,
    Textarea,
  ],
  templateUrl: './client-appointment-add-page.component.html',
  styleUrl: './client-appointment-add-page.component.scss'
})
export class ClientAppointmentAddPageComponent {
  appointmentForm!: FormGroup
  chosenServices: Service[] = []
  adding: boolean = false;
  today: Date = new Date();

  submitted: boolean = false;

  selectedVehicle ?: Vehicle;

  constructor(private fb: FormBuilder,
              private appointmentService: AppointmentService,
              private messageService: MessageService,
              private authService: AuthService,
              private router: Router) {
    this.initForm();
  }

  initForm(){
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  clearAll() {
    this.chosenServices = []
  }

  addNewService() {
    this.adding = true;
  }

  selectVehicle(selected: Vehicle){
    this.selectedVehicle = selected;
  }

  delete(serviceId: string | number) {
    this.chosenServices = this.chosenServices.filter(service => service._id !== serviceId);
  }



  submit(){
    this.submitted = true;
    this.appointmentForm.markAsTouched()

    if (!this.appointmentForm.valid || !this.selectedVehicle || this.chosenServices.length === 0 ){
      this.messageService.add({severity: 'error', detail: 'veuillez remplir tous les conditions', life: 4000})
      this.submitted = false;
      return;
    }

    const formValue = this.appointmentForm.value;

    const user: User = this.authService.getCurrentUser()!;

    let appointmentForm: AppointmentCreate = {
      userClientId: user._id as string,
      date: new Date(formValue.date),
      description: formValue.description,
      status: AppointmentStatus.PENDING,
      services: this.chosenServices.map((value: Service) => {
        return {serviceId: value._id + ""}
      }),
      vehiculeId: this.selectedVehicle._id as string
    }


    this.appointmentService.create(appointmentForm).subscribe({
      next: (value) => {
        if (value.success){
          this.messageService.add({severity: 'success', detail: value.message, life: 4000})
          this.submitted = false;
          this.router.navigate(['/user-space/client/appointments'])
        }else{
          console.log("vl ==== ", value)
          this.messageService.add({severity: 'error', detail: value.message, closable: true, sticky: true})
          this.submitted = false;
        }
      },
      error: err => {
        this.messageService.add({severity: 'error', detail: 'une erreur inconnu s\'est produite', closable: true, sticky: true});
        this.submitted = false;
      }
    })
  }
}
