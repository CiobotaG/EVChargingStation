import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { Maintenance } from 'src/app/models/maintenance.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
errorMessage="";
maintenances:any;
  constructor(private maintenanceService: MaintenanceService,private appService: AppComponent, private userService: UserService,private authService: AuthService,private toastr: ToastrService,private router: Router) { }
  onSubmit() { this.getMaintenances() 
   
  } 

  calculateMaintenanceNotifications(): number {
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    return this.maintenances.filter((maintenance: Maintenance) => {
      const lastMaintenanceDate = new Date(maintenance.lastMaintenanceDate);
      return lastMaintenanceDate < sixMonthsAgo;
    }).length;
  }

  getMaintenances() {
    this.maintenanceService.getAllMaintenances().subscribe({
      next: resp => { 
        console.log(resp);
        this.maintenances = resp;
        this.login(this.user);
      },
      error: error => {
        console.log(error);
      },
    });
  }
  login(user: User) {
    console.log(user);
    this.userService.login(user).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data);
        localStorage.setItem('key',user.username);
        this.userService.getUserByUsername(user.username).subscribe({
          next: (resp:any) =>{
            if (resp.role=="Admin")
            localStorage.setItem('role',resp.role);
            else localStorage.removeItem('role');

            console.log(localStorage.getItem('role'))
            resp.notificationsCount=this.calculateMaintenanceNotifications();
        console.log(resp.notificationsCount)
        this.userService.updateUser(resp).subscribe(
          () => {
            console.log('User successfully updated!');
          },
          error => {
            console.log('Failed to update user:', error);
          }
        );
            this.authService.checkLoggedIn();
          }
        })
        console.log(localStorage.getItem('key'))
        console.log(localStorage.getItem('token'));
        this.toastr.success("Successfully Authenticated");
        localStorage.setItem("notificationsCount",this.calculateMaintenanceNotifications().toString());
        this.appService.checkLoggedIn();
        this.authService.checkLoggedIn();
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (error: any) => {
        this.errorMessage = " Username or password is invalid"
        this.toastr.error("Username or password is invalid")
      }
    });
  }

logout() {
  this.authService.logout();
}
  

}
