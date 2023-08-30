import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StationType } from 'src/app/models/stationtype.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StationTypeService } from 'src/app/services/stationtype.service';

@Component({
  selector: 'app-add-stationtype',
  templateUrl: './add-stationtype.component.html',
  styleUrls: ['./add-stationtype.component.css']
})
export class AddStationTypeComponent {
  id: any;
  stationtype: StationType = new StationType();
  isEditMode: boolean;
  addEditStationTypeForm!: FormGroup;

 
  constructor(private formBuilder: FormBuilder,
    private stationtypeService: StationTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,private authService: AuthService) { }

  ngOnInit(): void { 
    if (!this.authService.isAdmin) {
      this.router.navigate(['/home']);
    }
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.route.snapshot.data['isEditMode'];

    if (this.isEditMode) {
      this.getStationTypeById();
    }
    
    this.addEditStationTypeForm = this.formBuilder.group({
      name: ["", Validators.required],
    });
  }

  get addStationType(): any {
    return this.addEditStationTypeForm.controls;
  }

  addOrEditStationType() {
    if (this.addEditStationTypeForm.valid) {
      let stationtype: StationType = {
        id: !this.isEditMode ? 0 : this.id,
        name: this.addStationType.name.value
      }

      if (!this.isEditMode) {
        this.stationtypeService.addStationType(stationtype).subscribe({
          next: () => {
            this.toastr.success("StationType successfully added!");
            this.router.navigate(['/stationtypes']);
          },
          error: (e) => {
            if (e.status === 700) {
              this.toastr.error(e.error);
            }
          }
        });
      } else { 
        this.stationtypeService.updateStationType(stationtype).subscribe({
          next: () => {
            this.toastr.success("StationType successfully updated!");
            this.router.navigate(['/stationtypes']);
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

  getStationTypeById() {
    this.stationtypeService.getStationType(this.id).subscribe({
      next: resp => {
        this.stationtype = {
          id: resp.id,
          name: resp.name
        }
        console.log(this.stationtype)
      },
      error: (e) => {
       {  e="Error";
          this.toastr.error(e.error);
        }
      }
    });
  }

}