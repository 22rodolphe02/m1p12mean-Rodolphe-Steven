import {Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Calendar} from 'primeng/calendar';
import {InputNumber} from 'primeng/inputnumber';
import {Vehicle, VehicleStatus} from '../../../vehicle/models/vehicle.model';
import {VehicleItemComponent} from '../../../vehicle/components/vehicle-item/vehicle-item.component';
import {CommonModule, NgClass} from '@angular/common';
import {MessageService} from 'primeng/api';
import {VehicleService} from '../../../vehicle/services/vehicle.service';
import {ApiResponse} from '../../../../core/models/response.model';
import {DatePicker} from 'primeng/datepicker';
import {AuthService} from '../../../../core/auth/auth.service';
import {User} from '../../../../core/models/user.model';

@Component({
  selector: 'g-client-vehicle-add-page',
  imports: [
    CommonModule,
    Button,
    RouterLink,
    InputText,
    ReactiveFormsModule,
    InputNumber,
    VehicleItemComponent,
    DatePicker
  ],
  templateUrl: './client-vehicle-add-page.component.html',
  styleUrl: './client-vehicle-add-page.component.scss'
})
export class ClientVehicleAddPageComponent {

  vehicleForm!: FormGroup

  fb: FormBuilder = inject(FormBuilder)

  vehiclePreview !: Vehicle

  submitted: boolean = false;

  constructor(private messageService: MessageService, private vehicleService: VehicleService,
              private router: Router,
              private authService: AuthService) {
    this.initForm();
    this.setVehiclePreview();
  }

  initForm(){
    this.vehicleForm = this.fb.group({
      marque: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      immatriculation: ['', Validators.required],
      kilometrage: ['', Validators.required]
    })
  }

  setVehiclePreview(){
    const formVal = this.vehicleForm.value

    console.log("formValue = ", formVal)
    this.vehiclePreview = {
      marque: formVal.marque,
      status: VehicleStatus.OPERATIONAL,
      kilometrage: formVal.kilometrage,
      model: formVal.model,
      immatriculation: formVal.immatriculation,
      createdAt: new Date(),
    }
  }

  preview(){

    this.setVehiclePreview();
    // this.show = !this.show
  }

  isValid(controlName: string): boolean{
    const control = this.vehicleForm.get(controlName)

    if (control && control.invalid && control.touched){
      return false;
    }
    // console.log(control?.invalid )

    return true;


  }



  onSubmit() {
    this.submitted = true;
    this.vehicleForm.markAllAsTouched()

    if (this.vehicleForm.valid){

      const formVal = this.vehicleForm.value

      const user : User = this.authService.getCurrentUser()!

      console.log("form value = ", )
      let vehicle: Vehicle = {
        marque: formVal.marque,
        status: VehicleStatus.OPERATIONAL,
        kilometrage: formVal.kilometrage,
        model: formVal.model,
        annee: new Date(formVal.year).getFullYear(),
        userId: user._id!.toString(),
        immatriculation: formVal.immatriculation,
      }

      console.log("")

      this.vehicleService.create(vehicle).subscribe((response: ApiResponse<Vehicle>) => {
        if (response.success){
          this.messageService.add({severity: 'success', detail: 'véhicule ajouté avec success', life: 5000})
          this.submitted = false;
          this.router.navigate(["/user-space/client/vehicles"])
          return;
        }

        this.messageService.add({severity: 'error', summary: '', detail: 'une erreur s\'est produite', life: 5000})


      })
    } else{
      this.submitted = false;
      this.messageService.add({severity: 'error', summary: '', detail: 'le formulaire n\'est pas valid', life: 5000})
    }
  }
}
