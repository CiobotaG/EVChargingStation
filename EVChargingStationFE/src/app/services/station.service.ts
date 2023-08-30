import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Station } from "../models/station.model";
const header = {
  headers: {
      'Content-Type': 'application/json',
      'responseType' : 'text'
  }
}
@Injectable({providedIn: 'root'})
export class StationService {

    protected apiURL = "https://localhost:7202/api/Station";
    constructor(protected http: HttpClient) {
    }

    getAllStations() {
        return this.http.get<Station[]>(`${this.apiURL}/getAllStations`)
    }

    addStation(station: Station) {
        return this.http.post<Station>(`${this.apiURL}/addStation`, station,header)
    }
 
    updateStation(station: Station) {
        return this.http.put<Station>(`${this.apiURL}/updateStation`, station)
      }

    deleteStation(id: number) {
        return this.http.delete(`${this.apiURL}/${id}`)
      }

      getStation(id: number) {
        return this.http.get<Station>(`${this.apiURL}/${id}`)
      }

      getStationsByLocationId(id: number) {
        return this.http.get<Station>(`${this.apiURL}/getStationByLocationId/${id}`)
      }

      
}