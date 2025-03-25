import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {
  ClientPersonalDetailComponent
} from '../../../client/components/client-personal-detail/client-personal-detail.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {InvoiceDetailComponent} from '../../components/invoice-detail/invoice-detail.component';

@Component({
  selector: 'g-invoice-details-page',
  imports: [
    Button,
    ClientPersonalDetailComponent,
    RouterOutlet,
    RouterLink,
    InvoiceDetailComponent
  ],
  templateUrl: './invoice-details-page.component.html',
  styleUrl: './invoice-details-page.component.scss'
})
export class InvoiceDetailsPageComponent {

}
