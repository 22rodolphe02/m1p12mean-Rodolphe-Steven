import {Component, input, Input} from '@angular/core';
import {Vehicle, VehicleStatus} from '../../models/vehicle.model';
import {VehicleItemComponent} from '../vehicle-item/vehicle-item.component';

@Component({
  selector: 'g-vehicle-list',
  imports: [
    VehicleItemComponent
  ],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent {
  vehicles: number[] = [];

  // vehicleService: VehicleService = inject(VehicleService)

  data = input<Vehicle[]>([])

  actionLink = input<string>()
  // @Input({alias: 'data'}) data: Vehicle[] | null = []

  constructor() {
    this.vehicles = Array.from(Array(6).keys()).map(i => i + 1);

    this.fakeData();
  }

  fakeData(){
    for (let i = 0; i < 6; i++) {
      this.data().push({
        _id: '1',
        status: VehicleStatus.OPERATIONAL,
        lastVisit: new Date(),
        mileage: 85000,
        model: 'Peugeot 2020',
        mark: 'Toyota',
        immatriculation: 'AD-182-BD',
        addedDate: new Date()
      })
    }
  }
}
