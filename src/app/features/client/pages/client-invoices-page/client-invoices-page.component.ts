import { Component } from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {InvoiceListComponent} from "../../../invoice/components/invoice-list/invoice-list.component";
import {LoaderComponent} from "../../../../shared/components/loader/loader.component";
import {PaginationComponent} from "../../../../shared/components/pagination/pagination.component";
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {Invoice} from '../../../invoice/models/invoice.model';
import {ActivatedRoute} from '@angular/router';
import {InvoiceService} from '../../../invoice/services/invoice.service';
import {MessageService} from 'primeng/api';
import {
  AdminClientsInvoicesPageComponent
} from '../../../admin/pages/admin-clients-invoices-page/admin-clients-invoices-page.component';
import {AuthService} from '../../../../core/auth/auth.service';
import {User} from '../../../../core/models/user.model';

@Component({
  selector: 'g-client-invoices-page',
    imports: [
        AsyncPipe,
        InvoiceListComponent,
        LoaderComponent,
        PaginationComponent
    ],
  templateUrl: './client-invoices-page.component.html',
  styleUrl: './client-invoices-page.component.scss'
})
export class ClientInvoicesPageComponent extends AdminClientsInvoicesPageComponent{
  private user!: User

  constructor(route: ActivatedRoute,
              invoiceService: InvoiceService,
              messageService: MessageService,
              private authService: AuthService) {

    super(route, invoiceService, messageService)

    // console.log("this")

    this.user = this.authService.getCurrentUser()!;
    this.clientId = this.user._id as string;
    // this.setClientId();


    this.loadInvoices();
  }

  // override setClientId() {
  //
  //   this.clientId = this.user._id as string;
  // }

  override getActionLink(){
    return `/user-space/invoices/`
  }
}
