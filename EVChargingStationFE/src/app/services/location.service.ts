import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Location } from "../models/location.model";
const header = {
  headers: {
      'Content-Type': 'application/json',
      'responseType' : 'text'
  }
}
@Injectable({providedIn: 'root'})
export class LocationService {

    protected apiURL = "https://localhost:7202/api/Location";
    constructor(protected http: HttpClient) {
    }

    getAllLocations() {
        return this.http.get<Location[]>(`${this.apiURL}/getAllLocations`)
    }

    addLocation(location: Location) {
        return this.http.post<Location>(`${this.apiURL}/addLocation`, location,header)
    }
 
    updateLocation(location: Location) {
        return this.http.put<Location>(`${this.apiURL}/updateLocation`, location)
      }

    deleteLocation(id: number) {
        return this.http.delete(`${this.apiURL}/${id}`)
      }

      getLocation(id: number) {
        return this.http.get<Location>(`${this.apiURL}/${id}`)
      }
}