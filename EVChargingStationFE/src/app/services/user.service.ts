import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { Observable } from 'rxjs';

import { LoginResponse } from "../models/loginresponse.model";
const header = {
  headers: {
      
      'responseType' : 'text'
  }
}
@Injectable({providedIn: 'root'})
export class UserService {

    protected apiURL = "https://localhost:7202/api/User";
    constructor(protected http: HttpClient) {
    }

    getAllUsers() {
        return this.http.get<User[]>(`${this.apiURL}/getAllUsers`)
    }

    addUser(user: User) {
        return this.http.post<User>(`${this.apiURL}/addUser`, user,header)
    }
 
    updateUser(user: User) {
        return this.http.put<User>(`${this.apiURL}/updateUser`, user)
      }

    deleteUser(id: number) {
        return this.http.delete(`${this.apiURL}/${id}`)
      }

      getUser(id: number) {
        return this.http.get<User>(`${this.apiURL}/${id}`)
      }

      getUserByUsername(username: string) {
        return this.http.get<User>(`${this.apiURL}/getUserByName/${username}`)
      }

      login(user: User): Observable<any> {
        return this.http.post(`${this.apiURL}/login`, user, { responseType: 'text' });
    }
    
    
}