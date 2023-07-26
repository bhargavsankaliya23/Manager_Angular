import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { HomeComponent } from 'src/app/back-end/home/home.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EnterpriseComponent } from 'src/app/back-end/enterprise/enterprise.component';
import { LocationsComponent } from 'src/app/back-end/location/locations/locations.component';
import { PeopleComponent } from 'src/app/back-end/peoples/people/people.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AddNewLocationComponent } from 'src/app/back-end/location/add-new-location/add-new-location.component';
import { AddNewPeopleComponent } from 'src/app/back-end/peoples/add-new-people/add-new-people.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [
    HomeComponent,
    EnterpriseComponent,
    LocationsComponent,
    AddNewLocationComponent,
    PeopleComponent,
    AddNewPeopleComponent,
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    NgSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    GooglePlaceModule
  ]
})
export class AdminLayoutModule { }
