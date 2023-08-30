import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { LocationService } from './services/location.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { StationComponent } from './station/station/station.component';
import { StationTypeComponent } from './stationtype/stationtype/stationtype.component';
import { LocationComponent } from './location/location/location.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteconfirmationComponent } from './deleteconfirmation/deleteconfirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddLocationComponent } from './location/add-location/add-location.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddStationTypeComponent } from './stationtype/add-stationtype/add-stationtype.component';
import { AddStationComponent } from './station/add-station/add-station.component';
import { MatSelectModule } from '@angular/material/select';
import { UserComponent } from './user/user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaintenanceComponent } from './maintenance/maintenance/maintenance.component';
import { AddMaintenanceComponent } from './maintenance/add-maintenance/add-maintenance.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentification/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './services/auth/auth-interceptor.service';
import { AuthGuard } from './services/auth/authguard.service';
import { MapComponent } from './locationsMap/map/map.component';
import { AboutComponent } from './about/about/about.component';
import { MaintenanceNotificationListComponent } from './maintenance/maintenance-notification-list/maintenance-notification-list.component';
import { BarchartComponent } from './graphs/barchart/barchart/barchart.component';
import { PiechartComponent } from './graphs/piechart/piechart/piechart.component';
import { RadarchartComponent } from './graphs/radarchart/radarchart/radarchart.component';
import { NgChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    StationComponent,
    StationTypeComponent,
    DeleteconfirmationComponent,
    AddLocationComponent,
    AddStationTypeComponent,
    AddStationComponent,
    UserComponent,
    AddUserComponent,
    MaintenanceComponent,
    AddMaintenanceComponent,
    HomeComponent,
    LoginComponent,
    MapComponent,
    AboutComponent,
    MaintenanceNotificationListComponent,
    BarchartComponent,
    PiechartComponent,
    RadarchartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgChartsModule,
    
  ],
  providers: [
    AuthGuard,
    LocationService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
