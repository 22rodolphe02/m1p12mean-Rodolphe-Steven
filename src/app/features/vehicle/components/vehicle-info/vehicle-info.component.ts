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

  data = input<Vehicle>({
    mark: 'Toyota',
    addedDate: new Date(),
    model: 'Corolla',
    mileage: 4000,
    status: VehicleStatus.OPERATIONAL,
    immatriculation: 'AD-250-800'
  })

  fakeData(){

  }
}
