import { Component } from '@angular/core';
import {MechanicListComponent} from '../../components/mechanic-list/mechanic-list.component';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'g-mechanic-list-page',
  imports: [
    MechanicListComponent,
    PaginationComponent
  ],
  templateUrl: './mechanic-list-page.component.html',
  styleUrl: './mechanic-list-page.component.scss'
})
export class MechanicListPageComponent {

}
