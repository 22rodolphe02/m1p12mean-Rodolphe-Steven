import {Component, Input} from '@angular/core';
import {InvoiceDetail, InvoiceStatus} from '../../models/invoice.model';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {Button} from 'primeng/button';
import {InvoiceService} from '../../services/invoice.service';
import {MessageService} from 'primeng/api';
import {AuthService} from '../../../../core/auth/auth.service';
import {Role} from '../../../../core/models/user.model';

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

  constructor(private invoiceService: InvoiceService,
              private messageService: MessageService,
              private authService: AuthService) {
    console.log(this.data)
  }

  getClass(status: InvoiceStatus): string{
    if (status === InvoiceStatus.PAID){
      return 'success'
    }
    else
    return 'warning'
  }

  paid() {
    this.invoiceService.paid(this.data.factureId as string).subscribe({
      next: value => {
        if (value.success){
          this.messageService.add({severity: 'success', detail: value.message, life: 4000});
          this.data = value.data;
        }else{
          this.messageService.add({severity: 'error', detail: value.message, sticky: true, closable: true})
        }
      },

      error: err => {
        this.messageService.add({severity: 'error', detail: 'une erreur inconnue s\'est produite', sticky: true, closable: true})
        throw err;
      }
    })
  }

  showPaidButton(): boolean{
    const role: Role = this.authService.getRole()!;
    return role === Role.CLIENT && this.data.status !== InvoiceStatus.PAID;


  }

  protected readonly InvoiceStatus = InvoiceStatus;
}
