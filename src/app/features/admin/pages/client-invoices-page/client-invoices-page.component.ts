import { Component } from '@angular/core';
import {InvoiceListComponent} from '../../../invoice/components/invoice-list/invoice-list.component';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {ActivatedRoute} from '@angular/router';
import {InvoiceService} from '../../../invoice/services/invoice.service';
import {catchError, finalize, map, Observable, of, throwError} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {Invoice} from '../../../invoice/models/invoice.model';
import {MessageService} from 'primeng/api';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'g-client-invoices-page',
  imports: [
    InvoiceListComponent,
    PaginationComponent,
    LoaderComponent,
    AsyncPipe
  ],
  providers: [AsyncPipe],
  templateUrl: './client-invoices-page.component.html',
  styleUrl: './client-invoices-page.component.scss'
})
export class ClientInvoicesPageComponent {

  clientId!: string;

  loading: boolean = true;

  invoices$ !: Observable<ApiResponse<Invoice[]>>

  currentPage = 1;

  constructor(private route: ActivatedRoute,
              private invoiceService: InvoiceService,
              private messageService: MessageService) {
    this.route.parent?.parent?.params.subscribe(param => {
      this.clientId = param['id']
    })


    this.loaInvoices();
  }

  loaInvoices(){

    this.invoices$ = this.invoiceService.getAllByClient(this.clientId, {index: this.currentPage, limit: 10}).pipe(
      catchError((err, caught) => {
        const message = 'Une erreur s\'est produite dans le serveur';
        this.loading = false;
        this.messageService.add({severity: 'error', detail: message, sticky: true, closable: true});
        return throwError(() => err);
      }),
      finalize(() => {
        this.loading = false;
      })
    );
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loaInvoices();
  }

  getActionLink(){
    return `/user-space/admin/clients/${this.clientId}/invoices/`
  }
}
