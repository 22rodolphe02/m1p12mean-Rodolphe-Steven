import { Component } from '@angular/core';
import {MechanicListComponent} from '../../components/mechanic-list/mechanic-list.component';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {Client} from '../../../client/models/client.model';
import {ClientService} from '../../../client/services/client.service';
import {tap} from 'rxjs/operators';
import {MechanicService} from '../../services/mechanic.service';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'g-mechanic-list-page',
  imports: [
    MechanicListComponent,
    PaginationComponent,
    LoaderComponent,
    AsyncPipe
  ],
  templateUrl: './mechanic-list-page.component.html',
  styleUrl: './mechanic-list-page.component.scss'
})
export class MechanicListPageComponent {
  currentPage = 1;

  loading: boolean = false;

  mechanics$ !: Observable<ApiResponse<Client[]>>

  constructor(private mechanicService: MechanicService) {
    this.loadClientsData();
  }


  loadClientsData(){

    this.mechanics$ = this.mechanicService.getAll(undefined, {index: this.currentPage, limit: 10}).pipe(
      tap(value => {
      }),
      catchError(error => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    )
  }

  onPageChange(index: number) {
    this.currentPage = index;
    this.loadClientsData();
  }
}
