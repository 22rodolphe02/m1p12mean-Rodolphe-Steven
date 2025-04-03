import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {
  ClientPersonalDetailComponent
} from '../../../client/components/client-personal-detail/client-personal-detail.component';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {InvoiceDetailComponent} from '../../components/invoice-detail/invoice-detail.component';
import {InvoiceService} from '../../services/invoice.service';
import {catchError, finalize, Observable} from 'rxjs';
import {Invoice, InvoiceDetail} from '../../models/invoice.model';
import {ApiResponse} from '../../../../core/models/response.model';
import {tap} from 'rxjs/operators';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {AsyncPipe, Location} from '@angular/common';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'g-invoice-details-page',
  imports: [
    InvoiceDetailComponent,
    LoaderComponent,
    AsyncPipe
  ],
  templateUrl: './invoice-details-page.component.html',
  styleUrl: './invoice-details-page.component.scss'
})
export class InvoiceDetailsPageComponent {
  invoiceId!: string;

  invoices$ !: Observable<ApiResponse<InvoiceDetail>>;

  loading: boolean = true;

  constructor(private invoiceService: InvoiceService, private route: ActivatedRoute,
              private location: Location,
              private messageService: MessageService) {
    this.setInvoiceId();
    this.loadInvoice();
  }

  setInvoiceId(){
    this.route.params.subscribe(param => {
      this.invoiceId = param['invoiceId']
    })
  }

  loadInvoice(){
    this.invoices$ = this.invoiceService.getDetails(this.invoiceId).pipe(
      tap(value => {
        if (value.success){
          this.loading = false;
        }else {
          this.messageService.add({severity: 'error', detail: value.message, life: 5000})
          // this.location.back();
        }
      }),
      catchError((err, caught) => {
        this.messageService.add({severity: 'error', detail: 'une erreur inconnue s\'est produite', life: 5000})
        // this.location.back();
        throw err
      }),
      finalize(() => {
        this.loading = false;
      })
    )
  }
}
