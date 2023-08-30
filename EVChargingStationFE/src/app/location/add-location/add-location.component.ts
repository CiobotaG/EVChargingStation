import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from 'src/app/models/location.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent {
  locationId: any;
  location: Location = new Location();
  isEditMode: boolean;
  addEditLocationForm!: FormGroup;
  lat?: number | undefined;
  lng?: number | undefined;

 
  constructor(private formBuilder: FormBuilder,
    private locationService: LocationService,private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void { if (!this.authService.isAdmin) {
    this.router.navigate(['/home']);
  }
    this.locationId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.route.snapshot.data['isEditMode'];

    if (this.isEditMode) {
      this.getLocationById();
    }
    
    this.addEditLocationForm = this.formBuilder.group({
      name: ["", Validators.required],
      contactEmail: ["", Validators.required],
      address:["",Validators.required],
      city:["",Validators.required],
      country:["",Validators.required],
      latitude: [{value:this.lat, disabled: true }],
      longitude: [{value:this.lng, disabled: true }]
    });
  }

  get addLocation(): any {
    return this.addEditLocationForm.controls;
  }

  addOrEditLocation() {
    if (this.addEditLocationForm.valid) {
      let location: Location = {
        locationId: !this.isEditMode ? 0 : this.locationId,
        country: this.addLocation.country.value,
        city: this.addLocation.city.value,
        name: this.addLocation.name.value,
        address: this.addLocation.address.value,
        contactEmail: this.addLocation.contactEmail.value,
        latitude: this.lat,
        longitude: this.lng
      }

      if (!this.isEditMode) {
        this.locationService.addLocation(location).subscribe({
          next: () => {
            this.toastr.success("Location successfully added!");
            this.router.navigate(['/locations']);
          },
          error: (e) => {
            if (e.status === 700) {
              this.toastr.error(e.error);
            }
          }
        });
      } else {
        this.locationService.updateLocation(location).subscribe({
          next: () => {
            this.toastr.success("Location successfully updated!");
            this.router.navigate(['/locations']);
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

  getLocationById() {
    this.locationService.getLocation(this.locationId).subscribe({
      next: resp => {
        this.location = {
          locationId: resp.locationId,
          address: resp.address,
          city: resp.city,
          contactEmail: resp.contactEmail,
          country: resp.country,
          name: resp.name,
          latitude: resp.latitude,
          longitude: resp.longitude
        }
        console.log(this.location)
      },
      error: (e) => {
       {  e="Error";
          this.toastr.error(e.error);
        }
      }
    });
  }
  latitudeHandler($event: any) {
    this.lat = $event;
  }

  longitudeHandler($event: any) {
    this.lng = $event;
  }
}