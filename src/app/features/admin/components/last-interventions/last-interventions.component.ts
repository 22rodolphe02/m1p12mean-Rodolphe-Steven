import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {
    InterventionListComponent
} from "../../../interventions/component/intervention-list/intervention-list.component";
import {catchError, finalize, Observable} from 'rxjs';
import {Intervention} from '../../../interventions/models/intervention.model';
import {ApiResponse} from '../../../../core/models/response.model';
import {tap} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {AsyncPipe} from '@angular/common';
import {InterventionService} from '../../../interventions/services/intervention.service';

@Component({
  selector: 'g-last-interventions',
  imports: [
    InterventionListComponent,
    LoaderComponent,
    AsyncPipe
  ],
  templateUrl: './last-interventions.component.html',
  styleUrl: './last-interventions.component.scss'
})
export class LastInterventionsComponent {
  loading: boolean = true;

  interventions$!: Observable<ApiResponse<Intervention[]>>;


  constructor(private interventionService: InterventionService,
              private messageService: MessageService) {
    this.loadLastIntervention();
  }

  loadLastIntervention(){
    this.interventions$ = this.interventionService.getLatestFive().pipe(
      tap(value => {
        if (value.success){
          this.loading = false;
        }else {
          this.messageService.add({severity: 'error', detail: value.message, life: 4000})
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

}
