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


  submit() {
    this.submitted = true;
    this.appointmentForm.markAllAsTouched();

    // Validation plus complète
    if (!this.appointmentForm.valid || !this.selectedVehicle || this.chosenServices.length === 0) {
      this.messageService.add({
        severity: 'error',
        detail: 'Veuillez remplir tous les champs obligatoires et sélectionner au moins un service',
        life: 4000
      });
      this.submitted = false;
      return;
    }

    // Vérification que la date n'est pas dans le passé
    const selectedDate = new Date(this.appointmentForm.value.date);
    if (selectedDate < new Date()) {
      this.messageService.add({
        severity: 'error',
        detail: 'La date du rendez-vous ne peut pas être dans le passé',
        life: 4000
      });
      this.submitted = false;
      return;
    }

    const user: User = this.authService.getCurrentUser()!;
    const formValue = this.appointmentForm.value;

    // Création de l'objet rendez-vous
    const appointmentForm: AppointmentCreate = {
      userClientId: user._id as string,
      date: selectedDate,
      description: formValue.description,
      status: AppointmentStatus.PENDING,
      services: this.chosenServices.map((value: Service) => ({
        serviceId: value._id.toString() // Conversion plus sûre
      })),
      vehiculeId: this.selectedVehicle._id as string
    };

    // Appel au service
    this.appointmentService.create(appointmentForm).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            detail: response.message || 'Rendez-vous créé avec succès',
            life: 4000
          });

          // Réinitialisation du formulaire après succès
          this.appointmentForm.reset();
          this.chosenServices = [];
          this.selectedVehicle = undefined;

          // Navigation optionnelle vers la liste des rendez-vous
          this.router.navigate(['/user-space/client/appointments']);

        } else {
          this.messageService.add({
            severity: 'error',
            detail: response.message || 'Erreur lors de la création du rendez-vous',
            closable: true,
            sticky: true
          });
        }
        this.submitted = false;
      },
      error: (err) => {
        console.error('Erreur lors de la création du rendez-vous:', err);

        let errorMessage = 'Une erreur inconnue s\'est produite';

        // Gestion des différents types d'erreurs
        if (err.error?.message) {
          errorMessage = err.error.message;
        } else if (err.status === 409) {
          errorMessage = 'Aucun mécanicien disponible a cette heure';
        } else if (err.status === 400) {
          errorMessage = 'Données invalides. Veuillez vérifier les informations saisies';
        }

        this.messageService.add({
          severity: 'error',
          detail: errorMessage,
          closable: true,
          sticky: true
        });

        this.submitted = false;
      }
    });
  }



  // submit(){
  //   this.submitted = true;
  //   this.appointmentForm.markAsTouched()
  //
  //   if (!this.appointmentForm.valid || !this.selectedVehicle || this.chosenServices.length === 0 ){
  //     this.messageService.add({severity: 'error', detail: 'veuillez remplir tous les conditions', life: 4000})
  //     this.submitted = false;
  //     return;
  //   }
  //
  //   const formValue = this.appointmentForm.value;
  //
  //   const user: User = this.authService.getCurrentUser()!;
  //
  //   let appointmentForm: AppointmentCreate = {
  //     userClientId: user._id as string,
  //     date: new Date(formValue.date),
  //     description: formValue.description,
  //     status: AppointmentStatus.PENDING,
  //     services: this.chosenServices.map((value: Service) => {
  //       return {serviceId: value._id + ""}
  //     }),
  //     vehiculeId: this.selectedVehicle._id as string
  //   }
  //
  //
  //   this.appointmentService.create(appointmentForm).subscribe({
  //     next: (value) => {
  //       if (value.success){
  //         this.messageService.add({severity: 'success', detail: value.message, life: 4000})
  //         this.submitted = false;
  //         // this.router.navigate(['/user-space/client/appointments'])
  //       }else{
  //         this.messageService.add({severity: 'error', detail: value.message, closable: true, sticky: true})
  //         this.submitted = false;
  //       }
  //     },
  //     error: err => {
  //       console.log("err ==== ", err)
  //       this.messageService.add({severity: 'error', detail: 'une erreur inconnu s\'est produite', closable: true, sticky: true});
  //       this.submitted = false;
  //     }
  //   })
  // }
}
