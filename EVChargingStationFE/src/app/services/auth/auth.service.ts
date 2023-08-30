import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject,Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  username:any;
  isAdmin=false;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  redirectUrl = 'http://localhost:4200/home'; 
  user:any;
  

  constructor(private http: HttpClient, private router: Router,private userService:UserService) {
    this.checkLoggedIn();
  }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('key');
    localStorage.removeItem('token');
    this.isAdmin=false;
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
  
  getToken() {
    return localStorage.getItem('token');
  }

  getUsername() {
    return localStorage.getItem('key');
  }
  getRole() {
    return localStorage.getItem('role');
  }
  getCurrentUser(): Observable<User> {
    this.username = this.getUsername();
    return this.userService.getUserByUsername(this.username).pipe(
      map((resp: any) => {
        this.user = resp;
        console.log(this.user.username);
        return this.user;
      })
    );
  }

  checkLoggedIn() {
    if(this.getUsername())
       this.user = this.getUsername();
    if (this.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    if (this.getRole()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
