import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/common.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLayoutService {


  alert: any = null;
  role: any = null;
  jobPosition: any = null;
  people: any = null;
  password: any = '';
  kioskPin: any = '';
  locationActive: any = null;

  constructor(public http: HttpClient, public commonService: CommonService) { }



  private alertDataSource = new BehaviorSubject<any>(this.alert);
  alertData = this.alertDataSource.asObservable();

  alertShow(data: any) {
    this.alert = data;
    this.alertDataSource.next(this.alert);
  }

  private passwordDataSource = new BehaviorSubject<any>(this.password);
  passwordData = this.passwordDataSource.asObservable();

  private kioskPinDataSource = new BehaviorSubject<any>(this.kioskPin);
  kioskPinData = this.kioskPinDataSource.asObservable();

  private roleDataSource = new BehaviorSubject<any>(this.role);
  roleData = this.roleDataSource.asObservable();

  private jobPositionDataSource = new BehaviorSubject<any>(this.jobPosition);
  jobPositionData = this.jobPositionDataSource.asObservable();

  private peopleDataSource = new BehaviorSubject<any>(this.people);
  peopleData = this.peopleDataSource.asObservable();

  private locationActiveDataSource = new BehaviorSubject<any>(this.locationActive);
  locationActiveData = this.locationActiveDataSource.asObservable();


  getActiveRole() {
    this.http.get(this.commonService.rootData.rootUrl + 'role-master/active-list').subscribe((response: any) => {
      if (response.meta.code == 200) {
        this.role = [];
        response.data.forEach((x: any) => {
          this.role.push({
            roleName: x.roleName,
            _id: x._id,
            status: x.status,
          });
        })
        this.roleDataSource.next(this.role);
      }
    });
  }

  getPeopleList(query: any) {
    return this.http.get(this.commonService.rootData.rootUrl + 'people-info/general-info-list', { params: query })
    // this.http.get(this.commonService.rootData.rootUrl + 'people-info/general-info-list').subscribe((response: any) => {
    //   if (response.meta.code == 200) {
    //     this.people = [];
    //     response.data.forEach((x: any) => {
    //       this.people.push(x);
    //     })
    //     this.peopleDataSource.next(this.people);
    //   }
    // });
  }

  getGeneralInfoListByID(generalinfoId: any) {

    return this.http.get(this.commonService.rootData.rootUrl + 'people-info/general-info-list-byID', { params: generalinfoId })
  }

  saveGeneralInfoData(data: any, generalinfoId: any) {
    return this.http.post(this.commonService.rootData.rootUrl + 'people-info/general-info-create-update', data, { params: generalinfoId })
  }

  generateAutoPassword(length: number) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const capitalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '@#$%&';
    const numericChars = '0123456789';

    let password = '';

    // Ensure at least one character from each set is included
    password += this.getRandomChar(lowercaseChars);
    password += this.getRandomChar(capitalChars);
    password += this.getRandomChar(specialChars);
    password += this.getRandomChar(numericChars);

    // Fill the remaining password length with random characters from all sets
    for (let i = password.length; i < length; i++) {
      const charSet = lowercaseChars + capitalChars + specialChars + numericChars;
      password += this.getRandomChar(charSet);
    }

    // Shuffle the password characters randomly to ensure unpredictability
    password = this.shuffleString(password);
    this.password = password;
    this.passwordDataSource.next(this.password);
  }
  getRandomChar(charSet: any) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randomIndex];
  }
  shuffleString(str: any) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }

  getKioskPin() {
    const pin = Math.floor(1000 + Math.random() * 9000);
    this.kioskPin = pin;
    this.kioskPinDataSource.next(this.kioskPin);
  }

  getJobPositionList() {
    this.http.get(this.commonService.rootData.rootUrl + 'job-position/list').subscribe((Res: any) => {
      if (Res.meta.code == 200) {
        this.jobPosition = Res.data;
        this.jobPositionDataSource.next(this.jobPosition)
      }
    })
  }

  saveJobPosition(data: any) {
    return this.http.post(this.commonService.rootData.rootUrl + 'job-position/create', data);
  }

  saveUpdateLocationMaster(data: any, id: any) {
    return this.http.post(this.commonService.rootData.rootUrl + 'location-master/createUpdate', data, { params: id });
  }

  getLocationMasterById(id: any) {
    return this.http.get(this.commonService.rootData.rootUrl + 'location-master/listById', { params: id });
  }

  getLocationDataList() {
    return this.http.get(this.commonService.rootData.rootUrl + 'location-master/list')
  }

  getLocationActiveDataList() {
    this.http.get(this.commonService.rootData.rootUrl + 'location-master/activeList').subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.locationActive = Response.data;
        this.locationActiveDataSource.next(this.locationActive);
      }
    })
  }


}
