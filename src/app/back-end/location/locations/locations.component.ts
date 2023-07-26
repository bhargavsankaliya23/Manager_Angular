import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AdminLayoutService } from 'src/app/Layout/admin-layout/admin-layout.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  activeTypes = ['All'];
  l: any;
  p = 1;
  itemPerPage: number;
  searchTerm: string;
  itemPerPageList = [5, 10, 15, 20, 50]

  locationList: any[] = [];
  allLocationList: any[] = [];
  noData: boolean = false;

  constructor(public adminLayoutService: AdminLayoutService, public router: Router) { }

  ngOnInit(): void {
    this.itemPerPage = this.l = 10;
    this.getLocationList()
  }

  editLocation(locationId: any) {
    this.router.navigateByUrl('/admin/location/update-location/' + locationId)
  }

  itemPerPageChange() {
    this.p = 1;
    this.l = this.itemPerPage
  }

  search() {
    this.locationList = this.allLocationList.filter((val) => JSON.stringify(val).toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.p = 1;
    if (this.locationList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  getLocationList() {
    this.adminLayoutService.getLocationDataList().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.allLocationList = Response.data;
        this.locationList = this.allLocationList;
        this.noData = false;
      }
      else {
        this.noData = true;
      }
    })
  }
  sortingList(sort: Sort) {
    const data = this.allLocationList.slice();
    if (!sort.active || sort.direction === '') {
      this.locationList = data;
      return;
    }

    this.locationList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'email': return compare(a.email, b.email, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}