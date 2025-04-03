import {Component, ViewChild} from '@angular/core';
import {Button} from 'primeng/button';
import {
  ChartComponent,
  NgApexchartsModule, ApexOptions
} from "ng-apexcharts";
import {CommonModule} from '@angular/common';
import {PlanningComponent} from '../../../appointment/components/planning/planning.component';
import {
  InterventionListComponent
} from '../../../interventions/component/intervention-list/intervention-list.component';
import {KpiCardComponent} from '../../../../shared/components/kpi-card/kpi-card.component';
import {Kpi} from '../../../../core/models/kpi.model';
import {KpiGeneralComponent} from '../../components/kpi-general/kpi-general.component';
import {LastInterventionsComponent} from '../../components/last-interventions/last-interventions.component';
import {RevenueByServiceComponent} from '../../components/revenue-by-service/revenue-by-service.component';
import {
  InterventionsStatChartComponent
} from '../../components/interventions-stat-chart/interventions-stat-chart.component';

@Component({
  selector: 'g-admin-dashboard',
  imports: [
    CommonModule,
    Button,
    NgApexchartsModule,
    KpiGeneralComponent,
    LastInterventionsComponent,
    RevenueByServiceComponent,
    InterventionsStatChartComponent,
    PlanningComponent,
  ],
  templateUrl: './admin-dashboard-page.component.html',
  styleUrl: './admin-dashboard-page.component.scss'
})
export class AdminDashboardPageComponent {

  constructor() {
  }




}
