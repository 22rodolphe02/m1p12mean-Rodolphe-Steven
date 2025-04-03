import {Component, output} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {Select} from 'primeng/select';
import {Vehicle} from '../../../vehicle/models/vehicle.model';
import {catchError, finalize, Observable} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {VehicleService} from '../../../vehicle/services/vehicle.service';
import {AuthService} from '../../../../core/auth/auth.service';
import {tap} from 'rxjs/operators';
import {VehicleItemComponent} from '../../../vehicle/components/vehicle-item/vehicle-item.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'g-select-vehicle',
  imports: [
    AsyncPipe,
    LoaderComponent,
    PaginationComponent,
    Select,
    NgIf,
    VehicleItemComponent,
    FormsModule
  ],
  templateUrl: './select-vehicle.component.html',
  styleUrl: './select-vehicle.component.scss'
})
export class SelectVehicleComponent {

  vehicleSelected ?: Vehicle;

  select = output<Vehicle>()

  currentPage = 1;

  loading: boolean = true;

  vehicles$!: Observable<ApiResponse<Vehicle[]>>

  constructor(private vehicleService: VehicleService,
              private authService: AuthService) {

    this.loadVehicles();
  }

  loadVehicles(){
    const user = this.authService.getCurrentUser()!;
    this.vehicles$ = this.vehicleService.getAllNotInInterventionByClient(user._id as string, {index: this.currentPage, limit: 10}).pipe(
      tap(value => {
        console.log("value ==== ", value)
        if (value.success){
          this.loading = false;
        }
      }),
      catchError((err, caught) => {
        throw err;
      }),
      finalize(() => {
        this.loading = false;
      })
    )
  }

  emitVal() {
    this.select.emit(this.vehicleSelected!)
  }
}
