import {Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Calendar} from 'primeng/calendar';
import {InputNumber} from 'primeng/inputnumber';
import {Vehicle, VehicleStatus} from '../../../vehicle/models/vehicle.model';
import {VehicleItemComponent} from '../../../vehicle/components/vehicle-item/vehicle-item.component';

@Component({
  selector: 'g-client-vehicle-add-page',
  imports: [
    Button,
    RouterLink,
    InputText,
    ReactiveFormsModule,
    Calendar,
    InputNumber,
    VehicleItemComponent
  ],
  templateUrl: './client-vehicle-add-page.component.html',
  styleUrl: './client-vehicle-add-page.component.scss'
})
export class ClientVehicleAddPageComponent {

  vehicleForm!: FormGroup

  fb: FormBuilder = inject(FormBuilder)

  vehiclePreview !: Vehicle

  show: boolean = false;

  constructor() {
    this.initForm();
    this.setVehiclePreview();
  }

  initForm(){
    this.vehicleForm = this.fb.group({
      marque: [''],
      model: [''],
      year: [''],
      immatriculation: [''],
      kilometrage: ['']
    })
  }

  setVehiclePreview(){
    const formVal = this.vehicleForm.value

    console.log("formValue = ", formVal)
    this.vehiclePreview = {
      mark: formVal.marque,
      status: VehicleStatus.OPERATIONAL,
      mileage: formVal.kilometrage,
      model: formVal.model,
      immatriculation: formVal.immatriculation,
      addedDate: new Date(),
    }
  }

  preview(){

    this.setVehiclePreview();
    // this.show = !this.show
  }



  onSubmit() {

  }
}
