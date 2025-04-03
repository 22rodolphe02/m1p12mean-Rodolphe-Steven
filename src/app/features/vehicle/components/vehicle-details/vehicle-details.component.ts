import {Component, model} from '@angular/core';
import {
  InterventionDetail,
  InterventionStatus,
  ServicePerformedStatus
} from '../../../interventions/models/intervention.model';
import {Button} from 'primeng/button';
import {AsyncPipe, CurrencyPipe, DecimalPipe, NgIf, PercentPipe} from '@angular/common';
import {VehicleInfoComponent} from '../vehicle-info/vehicle-info.component';
import {InterventionService} from '../../../interventions/services/intervention.service';
import {VehicleDetail} from '../../models/vehicle.model';
import {AuthService} from '../../../../core/auth/auth.service';
import {Role} from '../../../../core/models/user.model';
import {MessageService} from 'primeng/api';
import {tap} from 'rxjs/operators';
import {catchError, finalize, Observable} from 'rxjs';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {Select} from 'primeng/select';
import {VehicleItemComponent} from '../vehicle-item/vehicle-item.component';
import {ApiResponse} from '../../../../core/models/response.model';
import {Piece} from '../../../pieces/models/piece.model';
import {PieceService} from '../../../pieces/services/piece.service';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputNumber} from 'primeng/inputnumber';


@Component({
  selector: 'g-vehicle-details',
  imports: [
    Button,
    CurrencyPipe,
    DecimalPipe,
    VehicleInfoComponent,
    NgIf,
    PaginationComponent,
    Select,
    AsyncPipe,
    LoaderComponent,
    ReactiveFormsModule,
    InputNumber,
    PercentPipe,
  ],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.scss'
})
export class VehicleDetailsComponent {
  data = model.required<VehicleDetail>();
  loadingPieces: boolean = true;
  pieces$?: Observable<ApiResponse<Piece[]>>;

  isAddingAction: boolean = false;

  piecePage = 1;
  pieceForm!: FormGroup;

  constructor(private interventionService: InterventionService,
              private authService: AuthService,
              private messageService: MessageService,
              private pieceService: PieceService,
              private fb: FormBuilder) {
  }

  initForm(){
    this.pieceForm = this.fb.group({
      piece: [null, Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]]
    })
  }

  addPiece() {
    if (this.isOwner()){
      this.isAddingAction = true;
      this.initForm();
      this.loadPieces();
    }




    console.log("adding action === ", this.isAddingAction)
  }

  isOwner(){
    try {
      const role = this.authService.getRole();
      return role === Role.MECHANICAL;
    } catch (error) {
      return false;
    }
  }

  showing(status: ServicePerformedStatus){
    return this.isOwner() && status === ServicePerformedStatus.IN_PROGRESS;

  }

  getStatusClass(status: InterventionStatus){
    return  this.interventionService.getStatusClass(status)
  }

  getServiceStatusClass(status: ServicePerformedStatus){
    return this.interventionService.getStatusServiceClass(status)
  }

  getIntervention(): InterventionDetail | undefined{
    return this.data().intervention;
  }

  isClient(){
    return this.authService.getRole() === Role.CLIENT;

  }

  loadPieces(){
    this.pieces$ = this.pieceService.getAll(undefined, {index: this.piecePage, limit: 10}).pipe(
      tap(value => {
        if (value.success){
          this.loadingPieces = true;
        }else{
          this.messageService.add({severity: "success", detail: value.message, life: 4000});
        }
      }),
      catchError((err, caught) => {
        throw err;
      }),
      finalize(() => {
        this.loadingPieces = false;
      })
    )
  }

  markAsFinish(serviceId: string | number) {
    const interventionId: string = this.getIntervention()!._id as string;
    this.interventionService.markAsFinish({interventionId: interventionId, serviceId: serviceId as string}).subscribe({
      next: (response) => {
        if (response.success){
          this.messageService.add({severity: "success", detail: response.message, life: 4000})
          const details: VehicleDetail = {
            intervention: response.data,
            info: response.data.vehicle
          }

          console.log("intervention === ", details.intervention)

          this.data.set(details)
        }
      },
      error: err => {
        this.messageService.add({severity: 'danger', detail: 'une erreur s\'est produite ', sticky: true, closable: true})
        throw err;
      }
    })
  }

  onAddPiece() {
    if (!this.pieceForm.valid){
      this.messageService.add({severity: 'error', detail: 'tous les champs ne sont pas valides', life: 4000})
    }

    const formVal = this.pieceForm.value;

    const data = {
      pieceId: formVal.piece._id as string,
      quantite: formVal.quantite as number,
      interventionId: this.data().intervention!._id as string
    }

    this.pieceForm.reset()
    this.isAddingAction = false;
    this.interventionService.addPiece(data).subscribe({
      next: value => {
        if (value.success){

          this.data.set({
            intervention: value.data,
            info: value.data.vehicle
          })

          this.messageService.add({severity: 'success', detail: value.message, life: 4000})
        }else {
          this.messageService.add({severity: 'error', detail: value.message, sticky: true, closable: true})
        }
      }
    })
  }

  validatePiece(pieceId: string | number) {
    if (this.isClient()) {
      const data = {
        pieceId: pieceId as string,
        interventionId: this.data().intervention!._id as string
      }
      this.interventionService.validatePiece(data).subscribe({
        next: value => {
          if (value.success){

            this.data.set({
              intervention: value.data,
              info: value.data.vehicle
            })

            this.messageService.add({severity: 'success', detail: value.message, life: 4000})
          }else {
            this.messageService.add({severity: 'error', detail: value.message, sticky: true, closable: true})
          }
        }
      })
    }
  }
}
