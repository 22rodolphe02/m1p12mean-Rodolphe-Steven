import { Component } from '@angular/core';
import {
  InterventionListComponent
} from '../../../interventions/component/intervention-list/intervention-list.component';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {SelectButton} from 'primeng/selectbutton';
import {catchError, finalize, Observable, of, throwError} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {Vehicle} from '../../../vehicle/models/vehicle.model';
import {Intervention} from '../../../interventions/models/intervention.model';
import {InterventionService} from '../../../interventions/services/intervention.service';
import {AsyncPipe} from '@angular/common';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {VehicleListComponent} from '../../../vehicle/components/vehicle-list/vehicle-list.component';
import {User} from '../../../../core/models/user.model';
import {AuthService} from '../../../../core/auth/auth.service';
import {MessageService} from 'primeng/api';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'g-mechanic-interventions-page',
  imports: [
    InterventionListComponent,
    Button,
    RouterLink,
    SelectButton,
    AsyncPipe,
    LoaderComponent,
    PaginationComponent,
    VehicleListComponent
  ],
  templateUrl: './mechanic-interventions-page.component.html',
  styleUrl: './mechanic-interventions-page.component.scss'
})
export class MechanicInterventionsPageComponent {

  interventions$ !: Observable<ApiResponse<Intervention[]>>; // Observable géré par AsyncPipe
  loading: boolean = true;

  currentPage = 1;

  constructor(private interventionService: InterventionService,
              private authService: AuthService,
              private messageService: MessageService) {
    this.loadInterventions();
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadInterventions();
  }

  loadInterventions(){
    const user: User | null = this.authService.getCurrentUser();

    if (!user) {
      this.loading = false;
      this.interventions$ = of();
      return;
    }

    const userId = user._id! as string

    this.interventions$ = this.interventionService.getAllByMechanical(userId).pipe(
      tap(value => {
        console.log("value ===== ", value)
      }),
      catchError(error => {
        const message = 'Erreur lors du chargement des véhicules';
        this.loading = false;
        this.messageService.add({severity: 'error', detail: message});
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    )
  }


}
