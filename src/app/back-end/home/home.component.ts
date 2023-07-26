import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  outletList = ['Vidhan Infotech', 'Oracle'];
  leaveTypeList = ['Casual Leave', 'Sick Leave', 'Emergency Leave'];
  areaList = ["IT", "Human Resource Management", "Web Desiner", "Admin", "Office Work"]

  startShift: boolean = false;
  endShift: boolean = false;
  startBreak: boolean = false;
  endBreak: boolean = false;
  shiftNumber: any;
  weekDayList: any[] = [];
  todayDate = this.datePipe.transform(new Date(), 'EEE dd MMM');

  constructor(public datePipe : DatePipe) {
    this.getWeekDay() 
      console.log(this.todayDate);
      
  }

  ngOnInit(): void {
    this.startShift = true;
  }

  // week date loop
  getWeekDay() {
    const today = new Date();
    const currentDay = today.getDay(); // Get the current day of the week (0 - Sunday, 1 - Monday, etc.)

    // Calculate the first date of the week by subtracting the current day from the current date
    let firstDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - currentDay);

    // Calculate the last date of the week by adding the remaining days until Saturday (6 - Saturday index) to the first date
    // let lastDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 6);

    for (let i = 0; i < 7; i++) {
      if (i == 0) {
        
        this.weekDayList.push(this.datePipe.transform(firstDate, 'EEE dd MMM'));
      }
      else {
        let newDate = new Date(firstDate.getTime());
        newDate.setDate(firstDate.getDate() + i);
        this.weekDayList.push(this.datePipe.transform(newDate, 'EEE dd MMM'));
      }
    }
    console.log("this.weekDayList",this.weekDayList);
    

  }

  // wWorking
  openModal(type: string) {
    if (type == 'wWorking') {
      $('#whoIsWorking').modal('show');
    }
    else if (type == 'profile') {
      $('#profile-modal').modal('show');
      $('#leave-request-modal').modal('hide');
    }
    else if (type == 'leaveModal') {
      $('#leave-request-modal').modal('show');
      $('#profile-modal').modal('hide');

    }
  }


  openShiftModal(shift: number) {
    this.shiftNumber = shift;
    $('#shiftsModal').modal('show');

    // if (shift == 1) {
    //   this.startShift = false;
    //   this.endShift = true;
    //   this.startBreak = true;
    //   this.endBreak = false;
    // }
    // else if (shift == 2) {
    //   this.startShift = false;
    //   this.endShift = false;
    //   this.startBreak = false;
    //   this.endBreak = false;
    // }
    // else if (shift == 3) {
    //   this.startShift = false;
    //   this.endShift = true;
    //   this.startBreak = false;
    //   this.endBreak = true;
    // }
    // else if (shift == 4) {
    //   this.startShift = false;
    //   this.endShift = true;
    //   this.startBreak = true;
    //   this.endBreak = false;
    // }
  }

  modalClose(type: string) {
    if (type == 'profile') {
      $('#profile-modal').modal('hide');
    }
  }

  shiftSave(shift: number) {
    if (shift == 1) {
      this.startShift = false;
      this.endShift = true;
      this.startBreak = true;
      this.endBreak = false;
    }
    else if (shift == 2) {
      this.startShift = false;
      this.endShift = false;
      this.startBreak = false;
      this.endBreak = false;
    }
    else if (shift == 3) {
      this.startShift = false;
      this.endShift = true;
      this.startBreak = false;
      this.endBreak = true;
    }
    else if (shift == 4) {
      this.startShift = false;
      this.endShift = true;
      this.startBreak = true;
      this.endBreak = false;
    }
    $('#shiftsModal').modal('hide');
  }

}
