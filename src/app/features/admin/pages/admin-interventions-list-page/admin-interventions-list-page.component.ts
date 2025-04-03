import { Component } from '@angular/core';
import {AsyncPipe, JsonPipe} from "@angular/common";
import {
    InterventionListComponent
} from "../../../interventions/component/intervention-list/intervention-list.component";
import {LoaderComponent} from "../../../../shared/components/loader/loader.component";
import {PaginationComponent} from "../../../../shared/components/pagination/pagination.component";
import {catchError, finalize, Observable, of, throwError} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {Intervention} from '../../../interventions/models/intervention.model';
import {InterventionService} from '../../../interventions/services/intervention.service';
import {AuthService} from '../../../../core/auth/auth.service';
import {MessageService} from 'primeng/api';
import {User} from '../../../../core/models/user.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'g-admin-interventions-list-page',
  imports: [
    AsyncPipe,
    InterventionListComponent,
    LoaderComponent,
    PaginationComponent,
    JsonPipe
  ],
  templateUrl: './admin-interventions-list-page.component.html',
  styleUrl: './admin-interventions-list-page.component.scss'
})
export class AdminInterventionsListPageComponent {

  interventions$ !: Observable<ApiResponse<Intervention[]>>; // Observable géré par AsyncPipe
  loading: boolean = true;

  currentPage = 1;

  constructor(private interventionService: InterventionService,
              private messageService: MessageService) {
    this.loadInterventions();
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadInterventions();
  }

  loadInterventions(){

    this.interventions$ = this.interventionService.getAll(undefined, {index: 1, limit: 10}).pipe(
      tap(value => {
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
