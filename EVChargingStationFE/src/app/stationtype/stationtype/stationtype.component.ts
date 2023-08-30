import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DeleteconfirmationComponent } from 'src/app/deleteconfirmation/deleteconfirmation.component';
import { StationType } from 'src/app/models/stationtype.model';
import { StationTypeService } from 'src/app/services/stationtype.service';

@Component({
  selector: 'app-stationtype',
  templateUrl: './stationtype.component.html',
  styleUrls: ['./stationtype.component.css']
})
export class StationTypeComponent implements OnInit, AfterViewInit {

  stationtypes:any;
  currentStationType:any;
  thestationtypeId:number;
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  columnsToDisplay: string[] = ["name","actions"];
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private stationtypeService: StationTypeService,public dialog: MatDialog,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getStationTypes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(stationtype: StationType): void {
    this.deleteStationType(stationtype,stationtype.id);
  }

  deleteStationType( stationtype: any, id: number): void {
    const dialogRef = this.dialog.open(DeleteconfirmationComponent);
    dialogRef.componentInstance.message = "Are you sure you want to delete this station type ? ";
    this.currentStationType = stationtype;
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteStationTypeConfirmed();
    });
  }

  deleteStationTypeConfirmed(): void {
    this.stationtypeService.deleteStationType(this.currentStationType.id).subscribe({
      next: resp => {
        this.toastr.info("Station type succesfully deleted");
        this.getStationTypes();
      },
      error: error => {
        error="StationType was not deleted";
        this.toastr.info(error);
      }
    });
  }
  
  
  getStationTypes() {
    this.stationtypeService.getAllStationTypes().subscribe({
      next: resp => {
        console.log(resp);
        this.stationtypes = resp;
        this.dataSource.data = resp;
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
