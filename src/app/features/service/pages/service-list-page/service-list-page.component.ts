import { Component } from '@angular/core';
import {ServiceListComponent} from '../../components/service-list/service-list.component';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {Dialog} from 'primeng/dialog';
import {ServiceAddComponent} from '../../components/service-add/service-add.component';

@Component({
  selector: 'g-service-list-page',
    imports: [
        ServiceListComponent,
        Button,
        RouterLink,
        PaginationComponent,
        Dialog,
        ServiceAddComponent,
        ServiceAddComponent
    ],
  templateUrl: './service-list-page.component.html',
  styleUrl: './service-list-page.component.scss'
})
export class ServiceListPageComponent {

  createMode: boolean = false;

  constructor() {
  }

  create(){
    this.createMode = true;

    console.log("salut")
  }

  isSave(state: boolean) {
    this.createMode = !state;
  }
}
