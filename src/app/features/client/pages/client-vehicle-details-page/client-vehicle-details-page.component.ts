import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'g-client-vehicle-details-page',
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './client-vehicle-details-page.component.html',
  styleUrl: './client-vehicle-details-page.component.scss'
})
export class ClientVehicleDetailsPageComponent {

}
