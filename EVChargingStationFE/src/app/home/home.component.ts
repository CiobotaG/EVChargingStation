import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from '../services/location.service';
import { Location } from '../models/location.model';
import { StationService } from '../services/station.service';
import { Station } from '../models/station.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  map: L.Map;
  locations: Location[];
  clickOnMarker:boolean=false;
  stations:any;
  columnsToDisplay: string[] = ["name", "serialNumber", "stationType"];
  constructor(private locationService: LocationService, private stationService: StationService) { }
  
  ngOnInit() {
    this.getLocations();
    this.initializeMap();
  }

  initializeMap() {
    this.map = L.map('map').setView([46.777951, 23.608691], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  getLocations() {
    this.locationService.getAllLocations().subscribe({
      next: (resp: Location[]) => {
        console.log(resp);
        this.locations = resp;
        this.addMarkersToMap();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  addMarkersToMap() {
    this.locations.forEach((location: Location) => {
      const marker = L.marker([location.latitude, location.longitude]).addTo(this.map);
      marker.bindPopup(location.name);
      marker.on('click', () => {
        this.clickOnMarker=!this.clickOnMarker;
        this.getStationsByLocation(location);
      });
    });
  }

  getStationsByLocation(location: Location) {
    this.stationService.getStationsByLocationId(location.locationId).subscribe({
      next: (resp) => {
        console.log(resp);
        this.stations=resp;
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
