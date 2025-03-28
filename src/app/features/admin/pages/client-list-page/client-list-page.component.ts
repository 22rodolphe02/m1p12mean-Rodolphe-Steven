import {Component, Input} from '@angular/core';
import {ClientListComponent} from '../../../client/components/client-list/client-list.component';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Client} from '../../../client/models/client.model';
import {Role} from '../../../../core/models/user.model';

@Component({
  selector: 'app-client-list-page',
  imports: [
    CommonModule,
    RouterModule,
    ClientListComponent,
    PaginationComponent,
    FormsModule,
    ReactiveFormsModule,

  ],
  templateUrl: './client-list-page.component.html',
  styleUrl: './client-list-page.component.scss'
})
export class ClientListPageComponent {

  @Input({alias: 'data'}) clients: Client[] = []
  visible: boolean = false;

  constructor(private router: Router) {
  }

  clickRow(id: number){
    this.visible = true;
    this.router.navigate([`user-space/admin/clients/${id}`])
  }


}
