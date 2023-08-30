import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationComponent } from './station/station/station.component';
import { LocationComponent } from './location/location/location.component';
import { AddLocationComponent } from './location/add-location/add-location.component';
import { StationTypeComponent } from './stationtype/stationtype/stationtype.component';
import { AddStationTypeComponent } from './stationtype/add-stationtype/add-stationtype.component';
import { AddStationComponent } from './station/add-station/add-station.component';
import { UserComponent } from './user/user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { MaintenanceComponent } from './maintenance/maintenance/maintenance.component';
import { AddMaintenanceComponent } from './maintenance/add-maintenance/add-maintenance.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentification/login/login.component';
import { AuthGuard } from './services/auth/authguard.service';
import { MapComponent } from './locationsMap/map/map.component';
import { AboutComponent } from './about/about/about.component';
import { BarchartComponent } from './graphs/barchart/barchart/barchart.component';
import { PiechartComponent } from './graphs/piechart/piechart/piechart.component';
import { RadarchartComponent } from './graphs/radarchart/radarchart/radarchart.component';


const routes: Routes = [
  { path: '', 
  component: HomeComponent
  },
  {path:"about",
component:AboutComponent},
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "locations",
    component: LocationComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "users",
    component: UserComponent
  },
  {
    path: "radar",
    component: RadarchartComponent
  },
  {
    path: "map",
    component: MapComponent
  },
  { 
    path: "maintenances",
    component: MaintenanceComponent,
    canActivateChild:[AuthGuard]
  },
  {
    path: "add-maintenance",
    component: AddMaintenanceComponent
  },
  {
    path: "stations",
    component: StationComponent
  },
  {
    path: "add-station",
    component: AddStationComponent
  },
  {
    path: "add-user",
    component: AddUserComponent
  },
  {
    path: "user/:id",
    component: AddUserComponent,
    data: {
      isEditMode: true
    }
    
  },
  {
    path: "register",
    component: AddUserComponent,
    data: {
      isRegisterMode:true,
      isEditMode: false
    }
    
  },
  {
    path: "maintenance/:id",
    component: AddMaintenanceComponent,
    data: {
      isEditMode: true
    }
    
  },
  {
    path: "barchart",
    component: BarchartComponent,
  },
  {
    path: "piechart",
    component: PiechartComponent,
  },
  {
    path: "station/:id",
    component: AddStationComponent,
    data: {
      isEditMode: true
    }
  },
  {
    path:"add-location",
    component:AddLocationComponent
  },
  {
    path: "location/:id",
    component: AddLocationComponent,
    data: {
      isEditMode: true
    }
  },
  {
    path:"stationtypes",
    component:StationTypeComponent
  },
  {
    path:"add-stationtype",
    component:AddStationTypeComponent
  },
  {
    path: "stationtype/:id",
    component: AddStationTypeComponent,
    data: {
      isEditMode: true
    }
  },
    {
    path: "**",
    redirectTo: "/locations"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
