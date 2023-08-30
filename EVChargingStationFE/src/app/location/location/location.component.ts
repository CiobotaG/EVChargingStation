import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteconfirmationComponent } from 'src/app/deleteconfirmation/deleteconfirmation.component';
import { Location } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, AfterViewInit {

  parentItem: string = "Location is parent";
  locations:any;
  currentLocation:any;
  thelocationId:number;
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  columnsToDisplay: string[] = ["name", "country", "city", "contactEmail","actions"];
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private locationService: LocationService,public dialog: MatDialog,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getLocations();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(location: Location): void {
    
    this.deleteLocation(location,location.locationId);
  }

  deleteLocation( location: any, id: number): void {
    const dialogRef = this.dialog.open(DeleteconfirmationComponent);
    dialogRef.componentInstance.message = "Are you sure you want to delete this location?";
    this.currentLocation = location;
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteLocationConfirmed();
    });
  }

  deleteLocationConfirmed(): void {
    this.locationService.deleteLocation(this.currentLocation.locationId).subscribe({
      next: resp => {
        this.toastr.info("Location succesfully deleted");
        this.getLocations();
      },
      error: error => {
        error="Location was not deleted";
        this.toastr.info(error);
      }
    });
  }
  
  
  getLocations() {
    this.locationService.getAllLocations().subscribe({
      next: resp => {
        console.log(resp);
        this.locations = resp;
        this.dataSource.data = resp;
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
