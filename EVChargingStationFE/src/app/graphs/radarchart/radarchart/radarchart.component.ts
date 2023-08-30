import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';
import { Station } from 'src/app/models/station.model';
import { StationService } from 'src/app/services/station.service';
import { forkJoin, max, Observable } from 'rxjs';

@Component({
  selector: 'app-radarchart',
  templateUrl: './radarchart.component.html',
  styleUrls: ['./radarchart.component.css']
})
export class RadarchartComponent implements OnInit {
  public radarChartLabels: string[] = ['Number of Stations', 'Latitude', 'Longitude','Distance from you in km'];
  public radarChartData: any[] = [];
  public radarChartType: any = 'radar';
  

  constructor(
    private locationService: LocationService,
    private stationService: StationService
  ) {}

  ngOnInit() {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locationService.getAllLocations().subscribe(
      (locations: Location[]) => {
        this.getStationCounts(locations);
      },
      (error: any) => {
        console.error('Failed to retrieve locations:', error);
      }
    );
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const earthRadius = 6371; 
  
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
  
    return distance;
  }
  
  degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }
  

  getStationCounts(locations: Location[]) {
    const observables: Observable<Station[]>[] = [];
    const locationStats: any[] = [];
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
  
          
          for (const location of locations) {
            observables.push(this.getStationsByLocationId(location.locationId));
          }
  
          forkJoin(observables).subscribe(
            (stations: Station[][]) => {
              for (let i = 0; i < locations.length; i++) {
                const location = locations[i];
                const stationCounts = stations[i].length;
                const latitude = location.latitude || 0;
                const longitude = location.longitude || 0;
                const name = location.name;
  
            
                const distance = this.calculateDistance(
                  latitude,
                  longitude,
                  userLatitude,
                  userLongitude
                );
  
                const locationData = {
                  location: name,
                  data: [stationCounts, latitude, longitude, distance.toFixed(2)],
                  label: name
                };
  
                locationStats.push(locationData);
              }
  
              this.radarChartData = locationStats;
            },
            (error: any) => {
              console.error('Failed to retrieve stations:', error);
            }
          );
        },
        (error) => {
          console.error('Failed to retrieve user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  
  
  
  
  
  getStationsByLocationId(id: number): Observable<Station[]> {
    return new Observable<Station[]>(observer => {
      this.stationService.getStationsByLocationId(id).subscribe(
        (stations: any) => {
          observer.next(stations);
          observer.complete();
        },
        (error: any) => {
          observer.error(error);
        }
      );
    });
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
