import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Maintenance } from 'src/app/models/maintenance.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.css'],
  providers: [DatePipe]
})
export class AddMaintenanceComponent {
  id: any;
  maintenance: Maintenance = new Maintenance();
  isEditMode: boolean;
  addEditMaintenanceForm!: FormGroup;
  allStations:any;

 
  constructor(private formBuilder: FormBuilder,private datePipe: DatePipe,
    private maintenanceService: MaintenanceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService, private stationService: StationService,private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isAdmin) {
      this.router.navigate(['/home']);
    }
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.route.snapshot.data['isEditMode'];

    if (this.isEditMode) {
      this.getMaintenanceById();
    }
    this.getAllStations();
    this.addEditMaintenanceForm = this.formBuilder.group({
      status: ["", Validators.required],
      description: ["", Validators.required],
      outcome: ["", Validators.required],
      station: ["", Validators.required],
      lastMaintenanceDate: ["", Validators.required],
      nextMaintenanceDate: ["", Validators.required]
    });
  }

  get addMaintenance(): any {
    return this.addEditMaintenanceForm.controls;
  }

  addOrEditMaintenance() {
    if (this.addEditMaintenanceForm.valid) {
      let maintenance: Maintenance = {
        id: !this.isEditMode ? 0 : this.id,
        station: this.addMaintenance.station.value,
        description: this.addMaintenance.description.value,
        outcome: this.addMaintenance.outcome.value,
        status: this.addMaintenance.status.value,
        lastMaintenanceDate: this.addMaintenance.lastMaintenanceDate.value,
        nextMaintenanceDate: this.addMaintenance.nextMaintenanceDate.value
      }

      if (!this.isEditMode) {console.log(maintenance)
        this.maintenanceService.addMaintenance(maintenance).subscribe({
          next: () => {
            this.toastr.success("Maintenance successfully added!");
            this.router.navigate(['/maintenances']);
          },
          error: (e) => {
            if (e.status === 700) {
              this.toastr.error(e.error);
            }
          }
        });
      } else {console.log(maintenance);
        this.maintenanceService.updateMaintenance(maintenance).subscribe({
          next: () => {
            console.log("updated maintenance=",maintenance);
            this.toastr.success("Maintenance successfully updated!");
            this.router.navigate(['/maintenances']);
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

  private getAllStations(): void {
    this.stationService.getAllStations().subscribe({
      next: resp => {
        this.allStations = resp;
      },
      error: error => {
        this.toastr.error(error.message);
      }
    })
  }
  getMaintenanceById() {
    this.maintenanceService.getMaintenance(this.id).subscribe({
      next: resp => {
        this.maintenance = {
          id: resp.id,
          station: resp.station,
          description: resp.description,
          outcome: resp.outcome,
          status: resp.status,
          lastMaintenanceDate: resp.lastMaintenanceDate,
          nextMaintenanceDate: resp.nextMaintenanceDate
        }
        console.log(this.maintenance)
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