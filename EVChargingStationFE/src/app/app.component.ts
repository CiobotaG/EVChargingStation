import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MaintenanceService } from './services/maintenance.service';
import { Maintenance } from './models/maintenance.model';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EVChargingStationsFE';
  toggleLocations = false;
  toggleStations = false;
  toggleUsers = false;
  maintenances: any;
  maintenanceNotifications: Maintenance[] = [];
  toggleMaintenance = false;
  toggleStationTypes = false;
  showMaintenanceNotifications=false;
  toggleGraphs = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private maintenanceService: MaintenanceService,private userService:UserService
  ) {}

  isLoggedIn: any;
  notificationsCount: number = 0;

  ngOnInit() { 
    this.checkLoggedIn();
    this.getMaintenances();
    console.log(this.HideisLoggedIn,this.HideRoleNotAdmin)
  }

  getMaintenances() {
    this.maintenanceService.getAllMaintenances().subscribe({
      next: resp => {
        console.log(resp);
        this.maintenances = resp;
        
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        setInterval(() => { 
          this.updateNotificationCount();
        }, 24 * 60 * 60 * 1000);
      }
    });
  }
  
  updateNotificationCount(): void {
    this.notificationsCount = this.calculateMaintenanceNotifications();
    this.authService.getCurrentUser().subscribe(
      (user: any) => {
        if (user) {
          user.notificationsCount = this.notificationsCount;
          this.userService.updateUser(user).subscribe(
            () => {
              console.log('User successfully updated!');
              localStorage.setItem('notificationsCount', this.notificationsCount.toString());
            },
            error => {
              console.log('Failed to update user:', error);
            }
          );
        }
      },
      error => {
        console.log('Failed to retrieve current user:', error);
      }
    );
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

  handleNotificationClick() {
    this.showMaintenanceNotifications = !this.showMaintenanceNotifications;
    this.notificationsCount = 0;
    localStorage.setItem('notificationsCount', '0');
    this.maintenanceService.getAllMaintenances().subscribe((response: any) => {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        this.maintenanceNotifications = response.filter(
          (maintenance: Maintenance) => {
            const lastMaintenanceDate = new Date(maintenance.lastMaintenanceDate);
            return lastMaintenanceDate < sixMonthsAgo;
          }
        );
        console.log(this.maintenanceNotifications);
    });
  }

  checkLoggedIn() {
    this.isLoggedIn = this.authService.isLoggedIn;
    console.log('User is logged in:', this.isLoggedIn);
    const storedNotificationCount = localStorage.getItem('notificationsCount');
    this.notificationsCount = storedNotificationCount ? parseInt(storedNotificationCount, 10) : 0;
  }

  get HideisLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get HideRoleNotAdmin(): boolean {
    return this.authService.isAdmin;
  }
get checkHide() : boolean {
  if (!this.HideRoleNotAdmin && !this.isLoggedIn)
  return false;
  return true;
 }
  hide() {
    this.toggleLocations = false;
    this.toggleStationTypes = false;
    this.toggleStations = false;
    this.toggleUsers = false;
    this.toggleMaintenance = false;
    this.toggleGraphs = false;
  }

  logout() {
    this.showMaintenanceNotifications=false;
    this.toastr.success('Successfully logged out');
    this.authService.logout();
    this.checkLoggedIn();
  }
}
