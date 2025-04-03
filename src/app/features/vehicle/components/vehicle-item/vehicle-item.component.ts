import {Component, input} from '@angular/core';
import {Vehicle} from '../../models/vehicle.model';
import {DatePipe, DecimalPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'g-vehicle-item',
  imports: [
    DecimalPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './vehicle-item.component.html',
  styleUrl: './vehicle-item.component.scss'
})
export class VehicleItemComponent {

  item = input.required<Vehicle>()

  actionLink = input<string>()

  withImage = input<boolean>(true);
}
