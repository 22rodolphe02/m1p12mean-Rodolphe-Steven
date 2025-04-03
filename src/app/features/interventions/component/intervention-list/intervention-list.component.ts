import {Component, input, Input, OnDestroy, OnInit} from '@angular/core';
// import { InterventionService } from '../../services/intervention.service';
import { CommonModule } from '@angular/common';
import {Intervention, InterventionStatus} from '../../models/intervention.model';
import { Subscription } from 'rxjs';
import {RouterLink} from '@angular/router';
import {InterventionService} from '../../services/intervention.service';
import {ProgressBar} from 'primeng/progressbar';

@Component({
  selector: 'g-intervention-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ProgressBar],
  templateUrl: './intervention-list.component.html',
  styleUrl: './intervention-list.component.scss',
})
export class InterventionListComponent {
  @Input({ alias: 'url' }) apiUrl?: string;

  actionLink = input.required<string>()

  @Input({alias: 'data'}) interventions: Intervention[] = []


  constructor(private interventionService: InterventionService) {
    console.log("data === ", this.interventions)
  }

  // ngOnDestroy(): void {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
  //
  // ngOnInit(): void {
  //   this.setInterventions();
  // }
  //
  // public setInterventions() {
  //   this.subscription = this.interventionService
  //     .getOngoingInterventions()
  //     .subscribe((response: any) => {
  //       if (response.success) {
  //         this.interventions = response.data;
  //       }
  //     });
  // }

  getStatusClass(status: InterventionStatus){
    return this.interventionService.getStatusClass(status)
  }

}
