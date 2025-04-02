import {Component, input, Input, OnDestroy, OnInit} from '@angular/core';
import {InterventionService} from '../../services/intervention.service';
import {Intervention, InterventionStatus} from '../../models/intervention.model';
import {Subscription} from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'g-intervention-list',
  imports: [
    RouterLink
  ],
  templateUrl: './intervention-list.component.html',
  styleUrl: './intervention-list.component.scss'
})
export class InterventionListComponent {

  @Input({alias: 'data'}) interventions: Intervention[] = []

  actionLink = input.required<string>()


  constructor(private interventionService: InterventionService) {

  }

  getStatusClass(status: InterventionStatus){
    return this.interventionService.getStatusClass(status)
  }

}
