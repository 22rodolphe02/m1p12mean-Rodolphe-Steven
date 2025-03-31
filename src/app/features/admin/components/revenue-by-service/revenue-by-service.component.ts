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
  public totalRevenue: string = '0.00'; // Variable pour stocker le total du chiffre d'affaire

  constructor(private interventionService: InterventionService) {}

  ngOnInit() {
    this.setRevenueStat();
    this.getTotalRevenue();
  }

  setRevenueStat() {
    this.interventionService.getStatsForChartPie().subscribe(response => {
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
          },
          dataLabels: {
            enabled: true,
            formatter: function (val: number) {
              return `% ${val.toFixed(2)}`;
            }
          },
          tooltip: {
            y: {
              formatter: function (val: number) {
                return `Ar ${val.toFixed(2)}`;
              }
            }
          }
        };
      }
    });
  }

  // Méthode pour obtenir le total du chiffre d'affaire
  getTotalRevenue() {
    this.interventionService.getTotalRevenueService().subscribe(response => {
      if (response.success && response.data) {
        this.totalRevenue = parseFloat(response.data.chiffreAffaire).toFixed(2); // Assure-toi de formater la valeur en string
      }
    });
  }
}
