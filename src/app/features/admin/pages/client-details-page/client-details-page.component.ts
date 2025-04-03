import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ClientPersonalDetailComponent} from '../../../client/components/client-personal-detail/client-personal-detail.component';
import {Button} from 'primeng/button';
import {ClientService} from '../../../client/services/client.service';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {ApiResponse} from '../../../../core/models/response.model';
import {Client} from '../../../client/models/client.model';
import {tap} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'g-client-details-page',
  imports: [
    RouterModule,
    ClientPersonalDetailComponent,
    Button
  ],
  providers: [AsyncPipe],
  templateUrl: './client-details-page.component.html',
  styleUrl: './client-details-page.component.scss'
})
export class ClientDetailsPageComponent {
  clientId !: string



  constructor(private userService: ClientService, private route: ActivatedRoute) {
    this.route.params.subscribe(param => {
      this.clientId = param['id'];
    })
  }


}
