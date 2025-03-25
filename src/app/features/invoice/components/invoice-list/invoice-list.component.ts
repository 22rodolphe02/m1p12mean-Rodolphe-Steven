import {Component, Input} from '@angular/core';
import {Invoice} from '../../models/invoice.model';
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
  numbers : number[] = []

  @Input({alias: 'data'}) data !: Invoice[];

  @Input({alias: 'actionLink', required: true}) actionLink!: string

  dateTest: Date = new Date();

  billing: number = 25000;

  redirectUrl!: string


  constructor(private invoiceService: InvoiceService, private authService: AuthService) {
    this.numbers = Array.from(Array(6).keys()).map(i => i + 1);

  }

  prepareActionLink(){
  }





  setData(){

    // if (this.clientId){
    //   this.data$ = this.invoiceService.getAllByClient(this.clientId)
    // }else {
    //   this.data$ = this.invoiceService.getAll()
    // }
  }
}
