import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteconfirmationComponent } from 'src/app/deleteconfirmation/deleteconfirmation.component';
import { Maintenance } from 'src/app/models/maintenance.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit, AfterViewInit {

  maintenances:any;
  currentMaintenance:any;
  theid:number;
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  columnsToDisplay: string[] = ["station", "description", "outcome", "status","lastmaintenancedate","nextmaintenancedate","actions"];
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private router: Router,private authService:AuthService,private maintenanceService: MaintenanceService,public dialog: MatDialog,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (!this.authService.isAdmin) {
      this.router.navigate(['/home']);
    }
    this.getMaintenances();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(maintenance: Maintenance): void {
    this.deleteMaintenance(maintenance,maintenance.id);
  }

  deleteMaintenance( maintenance: any, id: number): void {
    const dialogRef = this.dialog.open(DeleteconfirmationComponent);
    dialogRef.componentInstance.message = "Are you sure you want to delete this maintenance ?";
    this.currentMaintenance = maintenance;
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteMaintenanceConfirmed();
    });
  }

  deleteMaintenanceConfirmed(): void {
    this.maintenanceService.deleteMaintenance(this.currentMaintenance.id).subscribe({
      next: resp => {
        this.toastr.info("Maintenance succesfully deleted");
        this.getMaintenances();
      },
      error: error => {
        error="Maintenance was not deleted";
        this.toastr.info(error);
      }
    });
  }
  
  
  getMaintenances() {
    this.maintenanceService.getAllMaintenances().subscribe({
      next: resp => {
        console.log(resp);
        this.maintenances = resp;
        this.dataSource.data = resp;
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
