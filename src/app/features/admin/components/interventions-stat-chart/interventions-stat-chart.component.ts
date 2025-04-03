import { Component, ViewChild, OnInit } from '@angular/core';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import {InterventionService} from '../../../interventions/services/intervention.service';

@Component({
  selector: 'g-interventions-stat-chart',
  imports: [
    ChartComponent
  ],
  templateUrl: './interventions-stat-chart.component.html',
  styleUrl: './interventions-stat-chart.component.scss'
})
export class InterventionsStatChartComponent implements OnInit {

  @ViewChild('chart') chart!: ChartComponent;
  public interventionStat!: ApexOptions;

  constructor(private interventionService: InterventionService) { }

  ngOnInit() {
    this.setInterventionStat();
  }

  setInterventionStat() {
    this.interventionService.getStatsForChartBar().subscribe(response => {
      if (response.success && response.data) {
        const serviceNames = Object.keys(response.data);
        const serviceValues = Object.values(response.data);

        const values = serviceValues.map(value => parseFloat(value.toString()));

        this.interventionStat = {
          series: [
            {
              name: 'Interventions',
              data: values
            }
          ],
          chart: {
            type: 'bar',
            height: 300
          },
          colors: ['var(--p-amber-400)'],
          plotOptions: {
            bar: {
              distributed: true,
              horizontal: true,
              barHeight: '50%'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: serviceNames
          },
          grid: {
            show: false
          }
        };
      }
    });
  }
}
