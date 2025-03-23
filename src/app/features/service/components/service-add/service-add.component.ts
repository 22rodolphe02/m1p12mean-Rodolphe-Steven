import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from 'primeng/api';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {FloatLabel} from 'primeng/floatlabel';
import {InputNumber} from 'primeng/inputnumber';
import {Button} from 'primeng/button';

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
  ],
  templateUrl: './service-add.component.html',
  styleUrl: './service-add.component.scss'
})
export class ServiceAddComponent implements OnInit{

  @Input() id?: number
  @Output() success: EventEmitter<boolean> = new EventEmitter()

  serviceForm!: FormGroup

  constructor(private messageService: MessageService, private fb: FormBuilder) {
    this.success.emit(false);
  }

  initForm(){
    this.serviceForm = this.fb.group({
      nom: ['', [Validators.required]],
      description: [''],
    })
  }

  ngOnInit(): void {
    this.initForm();
  }


  submit() {
    console.log("salut")
    this.messageService.add({ severity: 'success', summary: '', detail: 'Enregistrement réussi', life: 5000})
    this.success.emit(true)
  }
}
