import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DeleteconfirmationComponent } from 'src/app/deleteconfirmation/deleteconfirmation.component';
import { Station } from 'src/app/models/station.model';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit, AfterViewInit {

  stations:any;
  currentStation:any;
  thestationId:number;
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  columnsToDisplay: string[] = ["name", "serialNumber", "location", "stationType","actions"];
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private stationService: StationService,public dialog: MatDialog,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getStations();
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(station: Station): void {
    this.deleteStation(station,station.stationId);
  }

  deleteStation( station: any, id: number): void {
    const dialogRef = this.dialog.open(DeleteconfirmationComponent);
    dialogRef.componentInstance.message = "Are you sure you want to delete this station ?";
    this.currentStation = station;
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteStationConfirmed();
    });
  }

  deleteStationConfirmed(): void {
    this.stationService.deleteStation(this.currentStation.stationId).subscribe({
      next: resp => {
        this.toastr.info("Station succesfully deleted");
        this.getStations();
      },
      error: error => {
        error="Station was not deleted";
        this.toastr.info(error);
      }
    });
  }
  
  
  getStations() {
    this.stationService.getAllStations().subscribe({
      next: resp => {
        console.log(resp);
        this.stations = resp;
        this.dataSource.data = resp;
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
