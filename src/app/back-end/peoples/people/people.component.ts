import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AdminLayoutService } from 'src/app/Layout/admin-layout/admin-layout.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  activeTypes = ['All'];
  locationList: any[] = [];
  accessLevelList: any[] = [];
  peopleList: any[] = [];
  allPeopleList: any[] = [];
  p = 1;
  l: number;
  itemPerPage: number;
  searchTerm: string;
  peopleListLength: number;
  noData: boolean = false;
  itemPerPageList = [5, 10, 15, 20, 50];
  locationID = null;
  roleId = null;

  constructor(public adminLayoutService: AdminLayoutService, public router: Router) { }

  ngOnInit(): void {

    this.p = 1;
    this.l = this.itemPerPage = 10;

    this.getPeopleList();

    //setup role observable
    this.adminLayoutService.roleData.subscribe(data => {
      this.accessLevelList = data;
    })

    // setup location observable
    this.adminLayoutService.locationActiveData.subscribe(data => {
      this.locationList = data;
    })

    // get role data for call observable
    this.adminLayoutService.getActiveRole();
    this.adminLayoutService.getLocationActiveDataList();


    //setup people observable
    // setTimeout(() => {
    //   this.adminLayoutService.peopleData.subscribe(data => {
    //     if (!data) {
    //       this.noData = true
    //   }
    //     this.allPeopleList = data;
    //     this.peopleList = this.allPeopleList;
    //     this.peopleListLength = this.peopleList.length
    //     console.log(this.peopleList);


    //   })
    // }, 0);
    // get people data for call observable
    // this.adminLayoutService.getPeopleList();
  }

  itemPerPageChange() {
    this.p = 1;
    this.l = this.itemPerPage
  }

  getPeopleList() {
    this.peopleList = [];
    let query = {
      location: this.locationID,
      role: this.roleId
    }
    this.adminLayoutService.getPeopleList(query).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.allPeopleList = Response.data;
        this.peopleList = this.allPeopleList;
        this.peopleListLength = this.peopleList.length;
        this.noData = false;
      }
      else {
        this.noData = true;
      }
    })
  }

  updatePeople(id: any) {
    this.router.navigateByUrl('/admin/peoples/update-new-people/' + id)
  }

  search() {

    this.peopleList = this.allPeopleList.filter((val) => JSON.stringify(val).toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.p = 1;
    if (this.peopleList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }

  }



  sortingList(sort: Sort) {
    debugger
    const data = this.allPeopleList.slice();
    if (!sort.active || sort.direction === '') {
      this.peopleList = data;
      return;
    }

    this.peopleList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return compare(a.lastName, b.lastName, isAsc);
        case 'location': return compare(a.location, b.location, isAsc);
        case 'role': return compare(a.roleData.roleName, b.roleData.roleName, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        default: return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}