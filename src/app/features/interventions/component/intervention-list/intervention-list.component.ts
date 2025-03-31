// ROD

// import {Component, Input, OnDestroy, OnInit} from '@angular/core';
// import {InterventionService} from '../../services/intervention.service';
// import {Intervention} from '../../models/intervention.model';
// import {Subscription} from 'rxjs';

// @Component({
//   selector: 'g-intervention-list',
//   imports: [],
//   templateUrl: './intervention-list.component.html',
//   styleUrl: './intervention-list.component.scss'
// })
// export class InterventionListComponent implements OnInit, OnDestroy{

//   @Input({alias: "url"}) apiUrl ?: string
//   @Input({alias: 'data'}) interventions: Intervention[] = []

//   private subscription!: Subscription

//   constructor(private interventionService: InterventionService) {
//   }

//   ngOnDestroy(): void {
//     this.closObservable();
//   }

//   ngOnInit(): void {
//     this.setInterventions();
//   }

//   public setInterventions(){
//     if (this.apiUrl != null){
//       const filters = { status: 'active', age: 'gt:30' };
//       const sort = 'nom:asc';
//       const pagination = { page: 2, limit: 10 };
//       this.subscription = this.interventionService.filteredInterventions(filters, sort, pagination, this.apiUrl).subscribe(
//         (data: Intervention[]) => {
//           this.interventions = data
//         }
//       )
//     }

//   }

//   private closObservable(){
//     // this.subscription.unsubscribe();
//   }

// }

// STEVEN

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { InterventionService } from '../../services/intervention.service';
import { CommonModule } from '@angular/common';
import { InterventionService } from '../../../mechanic/services/intervention.service';
import { Intervention } from '../../models/intervention.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'g-intervention-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intervention-list.component.html',
  styleUrl: './intervention-list.component.scss',
})

// export class InterventionListComponent implements OnInit, OnDestroy {
//   @Input({ alias: 'url' }) apiUrl?: string;
//   interventions: Intervention[] = []; // modifie ceci stp, change Intervention par var ou const ou let ou je ne sais pas pour que ca ne pose pas problemes dans ma page liste
//   private subscription!: Subscription;

//   constructor(private interventionService: InterventionService) {}

//   ngOnDestroy(): void {
//     if (this.subscription) {
//       this.subscription.unsubscribe();
//     }
//   }

//   ngOnInit(): void {
//     this.setInterventions();
//   }

//   public setInterventions() {
//     this.subscription = this.interventionService
//       .getOngoingInterventions()
//       .subscribe((response: any) => {
//         if (response.success) {
//           this.interventions = response.data;
//         }
//       });
//   }
// }

export class InterventionListComponent implements OnInit, OnDestroy {
  @Input({ alias: 'url' }) apiUrl?: string;
  interventions: any[] = []; // Modification ici
  private subscription!: Subscription;

  constructor(private interventionService: InterventionService) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.setInterventions();
  }

  public setInterventions() {
    this.subscription = this.interventionService
      .getOngoingInterventions()
      .subscribe((response: any) => {
        if (response.success) {
          this.interventions = response.data;
        }
      });
  }
}
