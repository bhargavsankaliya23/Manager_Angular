import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpriseComponent } from 'src/app/back-end/enterprise/enterprise.component';
import { HomeComponent } from 'src/app/back-end/home/home.component';
import { AddNewLocationComponent } from 'src/app/back-end/location/add-new-location/add-new-location.component';
import { LocationsComponent } from 'src/app/back-end/location/locations/locations.component';
import { AddNewPeopleComponent } from 'src/app/back-end/peoples/add-new-people/add-new-people.component';
import { PeopleComponent } from 'src/app/back-end/peoples/people/people.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'location/add-new-location', component: AddNewLocationComponent },
  { path: 'location/update-location/:id', component: AddNewLocationComponent },
  { path: 'peoples', component: PeopleComponent },
  { path: 'peoples/add-new-people', component: AddNewPeopleComponent },
  { path: 'peoples/update-new-people/:id', component: AddNewPeopleComponent },
  { path: 'location', component: LocationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
