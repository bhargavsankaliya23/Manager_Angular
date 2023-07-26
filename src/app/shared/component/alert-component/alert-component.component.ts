import { Component, OnInit } from '@angular/core';
import { AdminLayoutService } from 'src/app/Layout/admin-layout/admin-layout.service';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.css']
})
export class AlertComponentComponent implements OnInit {

  showAlert = false;
  message = '';
  alertType = '';

  constructor(public adminLayoutService: AdminLayoutService) { }

  ngOnInit(): void {

    this.adminLayoutService.alertData.subscribe(data => {
      if (!!data) {
        this.showDynamicAlert(data.message, data.type);
      }
    })
  }

  showDynamicAlert(message: string, alertType: string): void {
    this.message = message;
    this.alertType = 'alert-' + alertType; // alertType should be 'success', 'warning', 'danger', etc.
    this.showAlert = true;

    // Automatically hide the alert after 3 seconds (adjust as needed)
    setTimeout(() => {
      this.hideDynamicAlert();
    }, 1500);
  }



  hideDynamicAlert(): void {
    this.showAlert = false;
  }

}
