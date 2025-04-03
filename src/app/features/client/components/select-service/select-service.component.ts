import {
  Component,
  effect,
  EventEmitter,
  input,
  InputSignal, model, output,
  Output, OutputRef, ResourceRef
} from '@angular/core';
import {Service} from '../../../service/models/service.model';
import {ServiceItemComponent} from '../../../service/components/service-item/service-item.component';
import {Checkbox} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {catchError, finalize, map, Observable,} from 'rxjs';
import {ServiceService} from '../../../service/services/service.service';
import {ApiResponse} from '../../../../core/models/response.model';
import {rxResource} from '@angular/core/rxjs-interop';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {tap} from 'rxjs/operators';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'g-select-service',
  imports: [
    ServiceItemComponent,
    FormsModule,
    LoaderComponent,
    PaginationComponent,
    AsyncPipe
  ],
  templateUrl: './select-service.component.html',
  styleUrl: './select-service.component.scss'
})
export class SelectServiceComponent {

  chosen = model.required<Service[]>();

  services$ !: Observable<ApiResponse<Service[]>>;

  currentPage = 1;

  loading: boolean = true;

  constructor(private serviceService: ServiceService,
              private messageService: MessageService) {
    this.loadService();
  }

  loadService(){
    this.services$ = this.serviceService.getAll(undefined, {index: this.currentPage, limit: 10}).pipe(
      tap(value => {
        if (value.success){
          this.loading = false;
        }else{
          this.messageService.add({severity: 'error', detail: value.message, sticky: true, closable: true})
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

  isSelected(service: Service){
    return this.chosen().some(s => s._id === service._id)
  }




  select(service: Service, selected: boolean) {

    if (selected){
      // this.chosen().splice(index, 0, service)
      this.chosen().push(service)
    }else{

      const index = this.chosen().findIndex(value => value._id === service._id)
      this.chosen().splice(index, 1)
    }

    console.log("chosen: ", this.chosen())

    // this.chosen.emit(this.chosen())
  }

  onPageChange(index: number) {
    this.currentPage = index;
    this.loadService();
  }
}
