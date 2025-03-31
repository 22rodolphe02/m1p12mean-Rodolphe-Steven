import { Component, OnInit } from '@angular/core';
import { ApexOptions, ChartComponent } from "ng-apexcharts";
import { InterventionService } from '../../../mechanic/services/intervention.service';

@Component({
  selector: 'g-revenue-by-service',
  imports: [
    ChartComponent
  ],
  templateUrl: './revenue-by-service.component.html',
  styleUrl: './revenue-by-service.component.scss'
})
export class RevenueByServiceComponent implements OnInit {

  public revenueStat!: ApexOptions;

  constructor(private interventionService: InterventionService) {}

  ngOnInit() {
    this.setRevenueStat();
  }

  setRevenueStat() {
    this.interventionService.getStatsForChart().subscribe(response => {
      if (response.success && response.data) {
        const serviceNames = Object.keys(response.data);
        const serviceValues = Object.values(response.data);

        const values = serviceValues.map(value => parseFloat(value.toString()));

        this.revenueStat = {
          series: values,
          labels: serviceNames,
          chart: {
            type: "donut",
            height: 300
          },
          plotOptions: {
            pie: {
              donut: {
                size: '70'
              }
            }
          }
        };
      }
    });
  }
}
