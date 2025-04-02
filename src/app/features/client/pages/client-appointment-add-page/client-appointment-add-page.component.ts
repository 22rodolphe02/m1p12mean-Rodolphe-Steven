import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {ServiceItemComponent} from '../../../service/components/service-item/service-item.component';
import {Service} from '../../../service/models/service.model';
import {DatePicker} from 'primeng/datepicker';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SelectServiceComponent} from '../../components/select-service/select-service.component';
import {Dialog} from 'primeng/dialog';
import {RouterLink} from '@angular/router';
import {Appointment, AppointmentCreate, AppointmentStatus} from '../../../appointment/models/appointment.model';
import {AppointmentService} from '../../../appointment/services/appointment.service';
import {ApiResponse} from '../../../../core/models/response.model';
import {Select} from 'primeng/select';
import {CommonModule} from '@angular/common';

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
    Select,
  ],
  templateUrl: './client-appointment-add-page.component.html',
  styleUrl: './client-appointment-add-page.component.scss'
})
export class ClientAppointmentAddPageComponent {
  appointmentForm!: FormGroup
  chosenServices: Service[] = []
  adding: boolean = false;


  constructor(private fb: FormBuilder, private appointmentService: AppointmentService) {
    this.initForm()
  }

  initForm(){
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      vehicle: ['', Validators.required]
    })
  }

  clearAll() {
    this.chosenServices = []
  }

  addNewService() {
    this.adding = true;
  }

  submit(){
    const formValue = this.appointmentForm.value;

    let appointmentForm: AppointmentCreate = {
      userClientId: '67dc7a91c043856f2b9c5f74',
      date: new Date(formValue.date),
      status: AppointmentStatus.PENDING,
      services: this.chosenServices.map((value: Service) => {
        return {serviceId: value._id + ""}
      }),
      description: formValue.description,
      vehiculeId: '1'
    }

    console.log("appointment form = ", appointmentForm)


    this.appointmentService.create(appointmentForm).subscribe((response: ApiResponse<Appointment>) => {
      console.log("response = ", response)
    })
  }

  // setChosenService(services: Service[]) {
  //   console.log("chosen service = ", services)
  //   this.chosenServices = services;
  // }
}
