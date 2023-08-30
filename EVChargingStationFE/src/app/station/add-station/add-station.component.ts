import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Station } from 'src/app/models/station.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { StationService } from 'src/app/services/station.service';
import { StationTypeService } from 'src/app/services/stationtype.service';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.css']
})
export class AddStationComponent {
  stationId: any;
  station: Station = new Station();
  isEditMode: boolean;
  addEditStationForm!: FormGroup;
  allLocations:any;
  allStationTypes:any;

 
  constructor(private formBuilder: FormBuilder,
    private stationService: StationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,private authService: AuthService,private locationService: LocationService, private stationTypeService: StationTypeService) { }

  ngOnInit(): void {
    if (!this.authService.isAdmin) {
      this.router.navigate(['/home']);
    }
    this.stationId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.route.snapshot.data['isEditMode'];

    if (this.isEditMode) {
      this.getStationById();
    }
    this.getAllLocations();
    this.getAllStationTypes();
    this.addEditStationForm = this.formBuilder.group({
      name: ["", Validators.required],
      serialNumber: ["", Validators.required],
      location: ["", Validators.required],
      stationType: ["", Validators.required]
    });
  }

  get addStation(): any {
    return this.addEditStationForm.controls;
  }

  addOrEditStation() {
    if (this.addEditStationForm.valid) {
      let station: Station = {
        stationId: !this.isEditMode ? 0 : this.stationId,
        name: this.addStation.name.value,
        serialNumber: this.addStation.serialNumber.value,
        location: this.addStation.location.value,
        stationType: this.addStation.stationType.value,
      }

      if (!this.isEditMode) {
        this.stationService.addStation(station).subscribe({
          next: () => {
            this.toastr.success("Station successfully added!");
            this.router.navigate(['/stations']);
          },
          error: (e) => {
            if (e.status === 700) {
              this.toastr.error(e.error);
            }
          }
        });
      } else {
        this.stationService.updateStation(station).subscribe({
          next: () => {
            console.log("updated station=",station);
            this.toastr.success("Station successfully updated!");
            this.router.navigate(['/stations']);
          },
          error: () => {
             { 
              this.toastr.error("An error has occured");
            }
          }
        });
      }
    }
  }
  private getAllLocations(): void {
    this.locationService.getAllLocations().subscribe({
      next: resp => {
        this.allLocations = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    })
  }

  private getAllStationTypes(): void {
    this.stationTypeService.getAllStationTypes().subscribe({
      next: resp => {
        this.allStationTypes = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    })
  }
  getStationById() {
    this.stationService.getStation(this.stationId).subscribe({
      next: resp => {
        this.station = {
          stationId: resp.stationId,
          name: resp.name,
          serialNumber : resp.serialNumber,
          location: resp.location,
          stationType: resp.stationType
        }
        console.log(this.station)
      },
      error: (e) => {
       {  e="Error";
          this.toastr.error(e.error);
        }
      }
    });
  }

  compareObjects(o1: any, o2: any) {
    return (o1.name == o2.name && o1.id == o2.id) ? true : false;
  }

}