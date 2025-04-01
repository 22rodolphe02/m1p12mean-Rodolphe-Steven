import {Component, input} from '@angular/core';
import {DatePipe, DecimalPipe} from "@angular/common";
import {Vehicle, VehicleStatus} from '../../models/vehicle.model';

@Component({
  selector: 'g-vehicle-info',
  imports: [
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './vehicle-info.component.html',
  styleUrl: './vehicle-info.component.scss'
})
export class VehicleInfoComponent {

  data = input.required<Vehicle>()

  fakeData(){

  }
}
