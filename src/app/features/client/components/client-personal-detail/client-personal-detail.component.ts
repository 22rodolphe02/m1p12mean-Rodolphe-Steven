import {Component, effect, input} from '@angular/core';
import {AsyncPipe, DatePipe} from '@angular/common';
import {Tab, TabList, Tabs} from 'primeng/tabs';
import {UploadImageComponent} from '../../../../shared/components/upload-image/upload-image.component';
import {TabMenu} from '../../../../core/models/menu.model';
import {RouterLink, RouterModule} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {Client} from '../../models/client.model';
import {tap} from 'rxjs/operators';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'g-client-personal-detail',
  imports: [
    RouterModule,
    DatePipe,
    Tab,
    TabList,
    Tabs,
    UploadImageComponent,
    LoaderComponent,
    AsyncPipe,
  ],
  templateUrl: './client-personal-detail.component.html',
  styleUrl: './client-personal-detail.component.scss'
})
export class ClientPersonalDetailComponent {
  dateTest: Date = new Date();
  id = input.required<string>()

  tabs: TabMenu[] = [];

  detail$ !: Observable<ApiResponse<Client>>;

  loading: boolean = false;

  constructor(private userService: ClientService) {
    effect(() => {
      this.initTabMenu();
      this.loadDetail();
    });
  }

  loadDetail(){
    this.detail$ = this.userService.getById(this.id()).pipe(
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

  initTabMenu(){
    if (this.id){
      this.tabs = [
        {
          label : "Véhicules",
          link : `/user-space/admin/clients/${this.id()}`,
          icon: 'pi pi-car'
        },
        {
          label : "Interventions",
          link : `/user-space/admin/clients/${this.id()}/interventions-history`,
          icon: 'pi pi-cog'
        },
        {
          label : "Factures",
          link :  `/user-space/admin/clients/${this.id()}/invoices`,
          icon: 'pi pi-receipt'
        }
      ]
    }
  }
}
