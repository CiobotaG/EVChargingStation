import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { Maintenance } from 'src/app/models/maintenance.model';
import { Chart, ChartItem, LinearScale, CategoryScale, BarController, BarElement } from 'chart.js';
import { Station } from 'src/app/models/station.model';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  stations: string[] = [];
  maintenanceCounts: number[] = [];

  constructor(private maintenanceService: MaintenanceService) { }

  ngOnInit(): void {
    this.getMaintenances();
  }

  getMaintenances(): void {
    this.maintenanceService.getAllMaintenances().subscribe(
      maintenances => {
        const counts: { [station: string]: number } = {};
        maintenances.forEach((maintenance: Maintenance) => {
          const station: Station | null = maintenance.station;
  
          if (station !== null) {
            const stationName: string = station.name;
            if (counts[stationName]) {
              counts[stationName]++;
            } else {
              counts[stationName] = 1;
            }
          }
  
          console.log('Maintenance:', maintenance);
        });
  
        this.stations = Object.keys(counts);
        this.maintenanceCounts = Object.values(counts);
        console.log('Stations:', JSON.stringify(this.stations));
        console.log('Maintenance Counts:', JSON.stringify(this.maintenanceCounts));
        this.createChart();
      },
      error => {
        console.error('Failed to retrieve maintenance counts', error);
      }
    );
  }
  

  createChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    Chart.register(LinearScale, CategoryScale, BarController, BarElement);
    console.log(this.stations);
    console.log(this.maintenanceCounts);
    const chartData = {
      type: 'bar' as const, 
      data: {
        labels: this.stations,
        datasets: [
          {
            label: 'Maintenance Activities',
            data: this.maintenanceCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, chartData);
  }

  updateChart(): void {
    if (this.chart) { 
      this.chart.data.labels = this.stations;
      this.chart.data.datasets[0].data = this.maintenanceCounts;
      this.chart.update();
    }
  }
}
