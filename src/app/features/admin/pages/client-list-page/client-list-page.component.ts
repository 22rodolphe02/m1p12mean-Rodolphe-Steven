import {Component, Input} from '@angular/core';
import {Intervention} from '../../../interventions/models/intervention.model';
import {Button} from 'primeng/button';
import {ClientListComponent} from '../../../client/components/client-list/client-list.component';
import {PaginationComponent} from '../../../../shared/components/pagination/pagination.component';
import {ClientFilterComponent} from '../../../client/components/client-filter/client-filter.component';
import {Chip} from 'primeng/chip';
import {FloatLabel} from "primeng/floatlabel";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {Router, RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {Dialog} from 'primeng/dialog';
import {Avatar} from 'primeng/avatar';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-client-list-page',
  imports: [
    CommonModule,
    RouterModule,
    Button,
    ClientListComponent,
    PaginationComponent,
    ClientFilterComponent,
    Chip,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    InputGroup,
    InputGroupAddon,
  ],
  templateUrl: './client-list-page.component.html',
  styleUrl: './client-list-page.component.scss'
})
export class ClientListPageComponent {

  @Input({alias: 'data'}) clients: Intervention[] = []
  visible: boolean = false;

  constructor(private router: Router) {
  }

  clickRow(id: number){
    this.visible = true;
    this.router.navigate([`user-space/admin/clients/${id}`])
  }

  closeDetail() {
    this.router.navigate(['user-space/admin/clients'])
  }
}
