import {Component, ResourceRef} from '@angular/core';
import {ServiceListComponent} from '../../components/service-list/service-list.component';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {Dialog} from 'primeng/dialog';
import {ServiceAddComponent} from '../../components/service-add/service-add.component';
import {catchError, finalize, map, Observable, of, throwError} from 'rxjs';
import {Service} from '../../models/service.model';
import {ServiceService} from '../../services/service.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import {ApiResponse} from '../../../../core/models/response.model';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'g-service-list-page',
  imports: [
    CommonModule,
    ServiceListComponent,
    Button,
    PaginationComponent,
    Dialog,
    ServiceAddComponent,
    ServiceAddComponent,
    LoaderComponent
  ],
  providers: [AsyncPipe],
  templateUrl: './service-list-page.component.html',
  styleUrl: './service-list-page.component.scss'
})
export class ServiceListPageComponent {

  createMode: boolean = false;

  loading: boolean = true;

  services$ !: Observable<ApiResponse<Service[]>>;

  currentPage: number = 1;

  constructor(private serviceService: ServiceService) {
    this.loadServices();
  }

  loadServices(){
    this.services$ = this.serviceService.getAll(undefined, {index: this.currentPage, limit: 5}).pipe(
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

  create(){
    this.createMode = true;
  }

  isSave(state: boolean) {
    this.createMode = !state;
  }

  onPageChange(index: number) {
    this.currentPage = index;
    this.loadServices();
  }
}
