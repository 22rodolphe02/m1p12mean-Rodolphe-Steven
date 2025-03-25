import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {ClientPersonalDetailComponent} from '../../../client/components/client-personal-detail/client-personal-detail.component';
import {Button} from 'primeng/button';

@Component({
  selector: 'g-client-details-page',
  imports: [
    RouterModule,
    ClientPersonalDetailComponent,
    Button
  ],
  templateUrl: './client-details-page.component.html',
  styleUrl: './client-details-page.component.scss'
})
export class ClientDetailsPageComponent {


}
