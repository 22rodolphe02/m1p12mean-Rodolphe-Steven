import {Component, Input} from '@angular/core';
import {InvoiceDetail, InvoiceStatus} from '../../models/invoice.model';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {Button} from 'primeng/button';

@Component({
  selector: 'g-invoice-detail',
  imports: [
    DatePipe,
    CurrencyPipe,
    Button
  ],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent {
  @Input({alias: 'data'}) data!: InvoiceDetail
  @Input({alias: 'id'}) id!: number

  constructor() {
    this.fakeData()
  }

  fakeData(){
    this.data = {
      date: new Date(),
      factureId: 12345,
      status: InvoiceStatus.PENDING,
      nomClient: "John Doe",
      emailClient: "johndoe@example.com",
      numeroClient: "0123456789",
      montant: 140000,
      services: {
        details: [
          {
            serviceId: 1,
            nom: "Réparation moteur",
            prix: 150,
            quantite: 1,
            montant: 150
          },
          {
            serviceId: 2,
            nom: "Changement huile",
            prix: 50,
            quantite: 1,
            montant: 100
          }
        ],
        total: 40000
      },
      pieces: {
        details: [
          {
            _id: 1,
            nom: "Filtre à huile",
            prixUnitaire: 20,
            quantite: 1,
            montant: 40
          },
          {
            _id: 2,
            nom: "Plaquettes de frein",
            prixUnitaire: 30,
            quantite: 1,
            montant: 30
          }
        ],
        total: 20000
      }
    };
  }

  getClass(status: InvoiceStatus): string{
    if (status === InvoiceStatus.PAID){
      return 'success'
    }
    else
    return 'warning'
  }

}
