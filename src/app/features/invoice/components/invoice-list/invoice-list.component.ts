import {Component, Input} from '@angular/core';
import {Invoice, InvoiceStatus} from '../../models/invoice.model';
import {InvoiceService} from '../../services/invoice.service';
import {RouterLink} from '@angular/router';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {AuthService} from '../../../../core/auth/auth.service';
import {Role} from '../../../../core/models/user.model';

@Component({
  selector: 'g-invoice-list',
  imports: [
    RouterLink,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent {

  @Input({alias: 'data'}) data !: Invoice[];

  @Input({alias: 'actionLink', required: true}) actionLink!: string

  constructor(private invoiceService: InvoiceService, private authService: AuthService) {

  }

  getStatusClass(status: InvoiceStatus){
    return this.invoiceService.getStatusClass(status)
  }
}
