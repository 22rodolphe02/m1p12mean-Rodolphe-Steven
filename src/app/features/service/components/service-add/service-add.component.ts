import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {MessageService} from 'primeng/api';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {FloatLabel} from 'primeng/floatlabel';
import {InputNumber} from 'primeng/inputnumber';
import {Button} from 'primeng/button';
import {ServiceService} from '../../services/service.service';
import {NgClass} from '@angular/common';
import {Service} from '../../models/service.model';
import {ApiResponse} from '../../../../core/models/response.model';

@Component({
  selector: 'g-service-add',
  imports: [
    ReactiveFormsModule,
    InputText,
    Textarea,
    InputGroup,
    InputGroupAddon,
    FloatLabel,
    InputNumber,
    Button,
    NgClass,
  ],
  templateUrl: './service-add.component.html',
  styleUrl: './service-add.component.scss'
})
export class ServiceAddComponent implements OnInit{

  @Input() id?: number
  @Output() success: EventEmitter<boolean> = new EventEmitter()

  serviceForm!: FormGroup

  submitted: boolean = false

  serviceService: ServiceService = inject(ServiceService)

  constructor(private messageService: MessageService, private fb: FormBuilder,) {
    this.success.emit(false);
  }

  initForm(){
    this.serviceForm = this.fb.group({
      nom: ['', [Validators.required]],
      description: [''],
      prix: ['', [Validators.required]],
      duree: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.initForm();
  }

  isValid(controlName: string): boolean{
    const control = this.serviceForm.get(controlName)

    if (control && control.invalid && control.touched){
      return false;
    }
    // console.log(control?.invalid )

    return true;


  }


  submit() {
    this.submitted = true;

    this.serviceForm.markAllAsTouched()

    const serviceAdd: Service = this.serviceForm.value;

    console.log("service data creation = ", serviceAdd)


    this.serviceService.create(serviceAdd).subscribe((response: ApiResponse<Service>) => {
      if (response.success) {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Enregistrement réussi', life: 5000})
        this.success.emit(true)
        this.serviceForm.reset()
      }else{
        this.messageService.add({ severity: 'danger', summary: '', detail: 'Enregistrement a échoué', life: 5000})
      }
    })





  }
}
