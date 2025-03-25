import { Component } from '@angular/core';
import {DatePipe} from '@angular/common';
import {Tab, TabList, Tabs} from 'primeng/tabs';
import {UploadImageComponent} from '../../../../shared/components/upload-image/upload-image.component';
import {TabMenu} from '../../../../core/models/menu.model';
import {RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'g-client-personal-detail',
  imports: [
    RouterModule,
    DatePipe,
    Tab,
    TabList,
    Tabs,
    UploadImageComponent,
  ],
  templateUrl: './client-personal-detail.component.html',
  styleUrl: './client-personal-detail.component.scss'
})
export class ClientPersonalDetailComponent {
  dateTest: Date = new Date();
  id !: number

  tabs: TabMenu[] = [];

  ngOnInit(): void {
    this.id = 1;
    this.initTabMenu();
  }

  initTabMenu(){
    this.tabs = [
      {
        label : "Véhicules",
        link : `/user-space/admin/clients/${this.id}`,
        icon: 'pi pi-car'
      },
      {
        label : "Interventions",
        link : `/user-space/admin/clients/${this.id}/interventions-history`,
        icon: 'pi pi-cog'
      },
      {
        label : "Factures",
        link :  `/user-space/admin/clients/${this.id}/invoices`,
        icon: 'pi pi-receipt'
      }
    ]
  }
}
