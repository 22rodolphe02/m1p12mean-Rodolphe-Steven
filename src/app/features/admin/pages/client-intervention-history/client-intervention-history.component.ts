import { Component } from '@angular/core';
import {Timeline} from 'primeng/timeline';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {Intervention, InterventionStatus} from '../../../interventions/models/intervention.model';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {finalize, Observable} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {InterventionService} from '../../../interventions/services/intervention.service';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {VehicleItemComponent} from '../../../vehicle/components/vehicle-item/vehicle-item.component';


interface EventItem {
  title: string,
  status?: string,
  date?: string,
  icon?: string,
  type?: string,
  image?: string,

}


@Component({
  selector: 'app-intervention-history',
  imports: [
    CommonModule,
    Timeline,
    PaginationComponent,
    SelectButton,
    FormsModule,
    LoaderComponent,
    VehicleItemComponent
  ],
  templateUrl: './client-intervention-history.component.html',
  styleUrl: './client-intervention-history.component.scss'
})
export class ClientInterventionHistoryComponent {
  events: EventItem[];

  history$ !: Observable<ApiResponse<Intervention[]>>

  clientId!: string;
  loading: boolean = true;

  historyPage: number = 1;

  filter: string = InterventionStatus.DONE;

  constructor(private interventionService: InterventionService,
              private route: ActivatedRoute,
              private messageService: MessageService) {
    this.events = [
      {title: 'Lavage', status: 'En cours', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', type : 'warning', image: 'game-controller.jpg' },
      {title: 'Frein', status: 'Terminé', date: '15/10/2020 14:00', icon: 'pi pi-cog', type: 'primary' },
      {title: 'Moteur', status: 'En attente', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', type : 'danger' },
      {title: 'Roue', status: 'Facturé', date: '16/10/2020 10:00', icon: 'pi pi-check', type : 'success' }
    ];

    this.route.parent?.params.subscribe(param => {
      this.clientId = param['id'];
      console.log("client id ==== ", this.clientId)
    })
    this.loadHistory();

  }

  loadHistory(){
    this.history$ = this.interventionService.getHistoriesByClient(this.clientId, {index: this.historyPage, limit: 5}).pipe(
      tap(value => {
        if (!value.success){
          this.messageService.add({severity: 'error', detail: value.message, life: 5000})
        }
        this.loading = false;
      }),
      finalize(() => {
        this.loading = false
      })
    )
  }

  // eventFinished(event: EventItem): boolean{
  //   return event.status === 'Terminé';
  //
  // }

  onPageChange(index: number) {
    this.historyPage = index;
    this.loadHistory();
  }
}
