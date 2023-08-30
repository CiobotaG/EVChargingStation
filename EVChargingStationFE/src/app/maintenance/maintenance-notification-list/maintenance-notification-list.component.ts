import { Component, Input } from '@angular/core';
import { Maintenance } from 'src/app/models/maintenance.model';


@Component({
  selector: 'app-maintenance-notification-list',
  templateUrl: './maintenance-notification-list.component.html',
  styleUrls: ['./maintenance-notification-list.component.css']
})
export class MaintenanceNotificationListComponent {
  @Input() maintenanceNotifications: Maintenance[] = [];
}
