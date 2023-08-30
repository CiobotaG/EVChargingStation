
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StationType } from "../models/stationtype.model";
const header = {
  headers: {
      'Content-Type': 'application/json',
      'responseType' : 'text'
  }
}
@Injectable({providedIn: 'root'})
export class StationTypeService {

    protected apiURL = "https://localhost:7202/api/StationType";
    constructor(protected http: HttpClient) {
    }

    getAllStationTypes() {
        return this.http.get<StationType[]>(`${this.apiURL}/getAllStationTypes`)
    }

    addStationType(stationtype: StationType) {
        return this.http.post<StationType>(`${this.apiURL}/addStationType`, stationtype,header)
    }
 
    updateStationType(stationtype: StationType) {
        return this.http.put<StationType>(`${this.apiURL}/updateStationType`, stationtype)
      }

    deleteStationType(id: number) {
        return this.http.delete(`${this.apiURL}/${id}`)
      }

      getStationType(id: number) {
        return this.http.get<StationType>(`${this.apiURL}/${id}`)
      }
}