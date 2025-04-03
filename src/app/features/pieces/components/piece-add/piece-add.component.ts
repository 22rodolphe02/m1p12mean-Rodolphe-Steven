import {Component, effect, input, output} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputNumber} from 'primeng/inputnumber';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputGroup} from 'primeng/inputgroup';
import {Button} from 'primeng/button';
import {PieceService} from '../../services/piece.service';
import {Piece, PieceAdd} from '../../models/piece.model';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'g-piece-add',
  imports: [
    InputText,
    ReactiveFormsModule,
    InputNumber,
    InputGroupAddon,
    InputGroup,
    Button
  ],
  templateUrl: './piece-add.component.html',
  styleUrl: './piece-add.component.scss'
})
export class PieceAddComponent {

  submitted: boolean = false;
  pieceForm!: FormGroup

  data = input<Piece>()

  success = output<boolean>()

  constructor(private fb: FormBuilder,
              private pieceService: PieceService,
              private messageService: MessageService) {
    effect(() => {
      this.initForm();
    });
    this.success.emit(false)
  }

  initForm(){
    if (this.data()){
      this.pieceForm = this.fb.group({
        nom: [this.data()?.nom, Validators.required],
        prixunitaire: [this.data()?.prixunitaire, Validators.required],
        quantite: [this.data()?.quantite, Validators.required]
      })
    }else{
      this.pieceForm = this.fb.group({
        nom: ['', Validators.required],
        prixunitaire: ['', Validators.required],
        quantite: ['', Validators.required]
      })
    }

  }


  save(data: Piece){
    this.pieceService.create(data).subscribe({
      next: value => {
        if (value.success){
          this.success.emit(true)
          this.messageService.add({severity: "success", life: 5000, detail: value.message})
        }else {
          this.messageService.add({severity: "error", life: 5000, detail: value.message})
        }
      },
      error: err => {
        this.messageService.add({severity: "error", sticky: true, closable: true, detail: 'une erreur inconnue s\'est produite'})
      }
    })
  }

  update(data: Piece){

    console.log("data === ", data)
    this.pieceService.update(data._id as string ,data).subscribe({
      next: value => {
        if (value.success){
          this.success.emit(true)
          this.messageService.add({severity: "success", life: 5000, detail: value.message})
        }else {
          this.messageService.add({severity: "error", life: 5000, detail: value.message})
        }
      },
      error: err => {
        this.messageService.add({severity: "error", sticky: true, closable: true, detail: 'une erreur inconnue s\'est produite'})
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    const formVal = this.pieceForm.value;

    const piece : Piece = {
      nom: formVal.nom,
      prixunitaire: formVal.prixunitaire,
      quantite: formVal.quantite
    }

    if (this.data()){
      piece._id = this.data()!._id
      this.update(piece)
    }else{
      this.save(piece)
    }

  }

  cancel() {
    this.success.emit(true)
  }
}
