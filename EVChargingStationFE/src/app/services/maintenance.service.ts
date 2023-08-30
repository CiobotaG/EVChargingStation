import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Maintenance } from "../models/maintenance.model";
const header = {
  headers: {
      'Content-Type': 'application/json',
      'responseType' : 'text'
  }
}
@Injectable({providedIn: 'root'})
export class MaintenanceService {

    protected apiURL = "https://localhost:7202/api/Maintenance";
    constructor(protected http: HttpClient) {
    }

    getAllMaintenances() {
        return this.http.get<Maintenance[]>(`${this.apiURL}/getAllMaintenances`)
    }

    addMaintenance(maintenance: Maintenance) {
        return this.http.post<Maintenance>(`${this.apiURL}/addMaintenance`, maintenance,header)
    }
 
    updateMaintenance(maintenance: Maintenance) {
        return this.http.put<Maintenance>(`${this.apiURL}/updateMaintenance`, maintenance)
      }

    deleteMaintenance(id: number) {
        return this.http.delete(`${this.apiURL}/${id}`)
      }

      getMaintenance(id: number) {
        return this.http.get<Maintenance>(`${this.apiURL}/${id}`)
      }
}