import { Component } from '@angular/core';
import {InvoiceListComponent} from '../../../invoice/components/invoice-list/invoice-list.component';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'g-client-invoices-page',
  imports: [
    InvoiceListComponent,
    PaginationComponent
  ],
  templateUrl: './client-invoices-page.component.html',
  styleUrl: './client-invoices-page.component.scss'
})
export class ClientInvoicesPageComponent {

  clientId!: number

  constructor() {
    this.clientId = 1
  }

  getActionLink(){
    return `/user-space/admin/clients/${this.clientId}/invoices/`
  }
}
