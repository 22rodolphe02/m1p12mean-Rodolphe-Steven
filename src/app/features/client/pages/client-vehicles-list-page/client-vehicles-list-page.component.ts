import {Component, OnDestroy, OnInit, ResourceRef} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from '@angular/common';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {VehicleListComponent} from '../../../vehicle/components/vehicle-list/vehicle-list.component';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {Vehicle, VehicleStatus} from '../../../vehicle/models/vehicle.model';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {VehicleService} from '../../../vehicle/services/vehicle.service';
import {ApiResponse} from '../../../../core/models/response.model';
import {Service} from '../../../service/models/service.model';
import {rxResource} from '@angular/core/rxjs-interop';
import {AuthService} from '../../../../core/auth/auth.service';
import {User} from '../../../../core/models/user.model';
import {MessageService} from 'primeng/api';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {HttpParams} from '@angular/common/http';
import {catchError, finalize, Observable, of, Subject, takeUntil, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'g-client-vehicles-list-page',
  imports: [
    PaginationComponent,
    VehicleListComponent,
    Button,
    RouterLink,
    SelectButton,
    FormsModule,
    LoaderComponent,
    AsyncPipe,
    NgIf,
    JsonPipe
  ],
  templateUrl: './client-vehicles-list-page.component.html',
  styleUrl: './client-vehicles-list-page.component.scss'
})
export class ClientVehiclesListPageComponent implements OnInit{


  statusList = Object.values(VehicleStatus);
  filter: string = VehicleStatus.OPERATIONAL;

  vehicles$ !: Observable<ApiResponse<Vehicle[]>>; // Observable géré par AsyncPipe
  loading: boolean = true;

  currentPage = 1;

  constructor(
    private vehicleService: VehicleService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {


  }

  ngOnInit(): void {
    this.vehicles$ = this.loadVehicles();
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.vehicles$ = this.loadVehicles();
  }

  loadVehicles() {
    const user: User | null = this.authService.getCurrentUser();

    if (!user) {
      this.loading = false;
      return of(); // Retourne un Observable vide
    }

    this.loading = true;


    return this.vehicleService.getAllByClient(user._id!, {index: this.currentPage, limit: 10}).pipe(
      catchError(error => {
        const message = 'Erreur lors du chargement des véhicules';
        this.loading = false;
        this.messageService.add({severity: 'error', detail: message});
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
