import {Component, Input} from '@angular/core';
import {ClientListComponent} from '../../../client/components/client-list/client-list.component';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {AsyncPipe, CommonModule} from '@angular/common';
import {Client} from '../../../client/models/client.model';
import {ClientService} from '../../../client/services/client.service';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {tap} from 'rxjs/operators';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-client-list-page',
  imports: [
    CommonModule,
    RouterModule,
    ClientListComponent,
    PaginationComponent,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,

  ],
  providers: [AsyncPipe],
  templateUrl: './client-list-page.component.html',
  styleUrl: './client-list-page.component.scss'
})
export class ClientListPageComponent {

  clients: Client[] = []
  currentPage = 1;

  loading: boolean = false;

  clients$ !: Observable<ApiResponse<Client[]>>

  constructor(private clientService: ClientService) {
    this.loadClientsData();
  }


  loadClientsData(){

    this.clients$ = this.clientService.getAll(undefined, {index: this.currentPage, limit: 10}).pipe(
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
