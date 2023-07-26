import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {

  leaveTypeList = ['Outlet Type'];


  constructor() { }

  ngOnInit(): void {
  }

}
