import { Component } from '@angular/core';
import {Timeline} from 'primeng/timeline';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {InterventionStatus} from '../../models/intervention.model';
import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';


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
    FormsModule
  ],
  templateUrl: './intervention-history.component.html',
  styleUrl: './intervention-history.component.scss'
})
export class InterventionHistoryComponent {
  events: EventItem[];

  statusList = Object.values(InterventionStatus)
  filter: string = InterventionStatus.DONE;

  constructor() {
    this.events = [
      {title: 'Lavage', status: 'En cours', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', type : 'warning', image: 'game-controller.jpg' },
      {title: 'Frein', status: 'Terminé', date: '15/10/2020 14:00', icon: 'pi pi-cog', type: 'primary' },
      {title: 'Moteur', status: 'En attente', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', type : 'danger' },
      {title: 'Roue', status: 'Facturé', date: '16/10/2020 10:00', icon: 'pi pi-check', type : 'success' }
    ];
  }

  eventFinished(event: EventItem): boolean{
    return event.status === 'Terminé';

  }
}
