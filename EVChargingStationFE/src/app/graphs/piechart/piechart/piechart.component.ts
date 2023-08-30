import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { MaintenanceService } from 'src/app/services/maintenance.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: any;

  constructor(private maintenanceService: MaintenanceService) {} // Inject your maintenance service

  ngOnInit(): void {
    this.getAllMaintenances();
  }

  getAllMaintenances(): void {
    this.maintenanceService.getAllMaintenances().subscribe(
      (maintenances: any[]) => {
        const statuses = maintenances.map(maintenance => maintenance.status);
        const counts = this.getStatusCounts(statuses);
        const colors = this.getStatusColors(Object.keys(counts));
  
        this.createChart(Object.keys(counts), Object.values(counts), colors);
      },
      (error: any) => {
        console.error('Failed to retrieve maintenance data', error);
      }
    );
  }
  
  getStatusCounts(statuses: string[]): { [status: string]: number } {
    const counts: { [status: string]: number } = {};
  
    statuses.forEach(status => {
      counts[status] = counts[status] ? counts[status] + 1 : 1;
    });
  
    return counts;
  }  

  createChart(statuses: any, counts: any, colors: any): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: statuses,
        datasets: [{  
          label: 'Maintenances',
          data: counts,
          backgroundColor: colors,
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  getStatusColors(statuses: string[]): string[] {
    return statuses.map(status => {
      switch (status) {
        case 'Completed':
          return 'green';
        case 'Incompleted':
          return 'grey';
        case 'Alert':
          return 'red';
        default:
          return 'blue'; 
      }
    });
  }
}
