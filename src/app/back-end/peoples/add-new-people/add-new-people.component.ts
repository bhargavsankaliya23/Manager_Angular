import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLayoutService } from 'src/app/Layout/admin-layout/admin-layout.service';
import { CountryStateCityService } from 'src/app/Layout/admin-layout/country-state-city.service';
import { CommonService } from 'src/app/shared/common.service';
declare const $: any;

@Component({
  selector: 'app-add-new-people',
  templateUrl: './add-new-people.component.html',
  styleUrls: ['./add-new-people.component.css']
})
export class AddNewPeopleComponent implements OnInit {

  activeTab: any;
  generalStep: boolean = false;
  profileStep: boolean = false;
  schdulingStep: boolean = false;
  accessLevelList: any[] = [];
  locationList: any[] = [];
  genderList = ['Male', 'Female', 'Other'];
  jobPositionList: any[] = [];
  countryList: any[] = [];
  stateList: any[] = [];
  cityList: any[] = [];

  generalTabForm: FormGroup;
  profileTabForm: FormGroup;
  submittedGeneralInfo: boolean = false;
  submittedProfileInfo: boolean = false;
  message: string;
  get fgeneralData(): { [key: string]: AbstractControl } {
    return this.generalTabForm.controls;
  }
  get fprofileData(): { [key: string]: AbstractControl } {
    return this.profileTabForm.controls;
  }

  profilePicture: any;
  imgURL: any;
  @ViewChild('profilePicture') profilePictureVariable: ElementRef;

  constructor(public router: Router, public fb: FormBuilder, public commonService: CommonService, public route: ActivatedRoute, public service: CountryStateCityService, public adminLayoutService: AdminLayoutService) { }

  ngOnInit(): void {
    this.defaultGeneralForm();
    this.defaultProfileForm();
    this.activeTab = 1;
    //setup jobPositionList observable
    this.adminLayoutService.jobPositionData.subscribe(data => {
      this.jobPositionList = data;
    })

    //setup role observable
    this.adminLayoutService.roleData.subscribe(data => {
      this.accessLevelList = data;
    })

    // setup country observable
    this.service.countryData.subscribe(data => {
      this.countryList = data;
    })

    // setup state observable
    this.service.stateData.subscribe(data => {
      this.stateList = data;
    })

    // setup city observable
    this.service.cityData.subscribe(data => {
      this.cityList = data;
    })

    // setup location observable
    this.adminLayoutService.locationActiveData.subscribe(data => {
      this.locationList = data;
    })

    // get role data for call observable
    this.adminLayoutService.getActiveRole()

    //get country data for call observable
    this.service.getCountries();
    this.service.getStatesByCountry('IN');

    this.adminLayoutService.getLocationActiveDataList()

    this.adminLayoutService.passwordData.subscribe(password => {
      if (password.length == 6) {
        this.generalTabForm.controls['password'].setValue(password);
      }
    })

    this.adminLayoutService.kioskPinData.subscribe(kioskPin => {
      if (kioskPin) {
        this.generalTabForm.controls['kioskPin'].setValue(kioskPin.toString());
      }
    })

    this.adminLayoutService.generateAutoPassword(6);
    this.adminLayoutService.getKioskPin();
    this.adminLayoutService.getJobPositionList();


    setTimeout(() => {
      if (this.router.url.includes('peoples/update-new-people')) {
        this.route.params.subscribe((x: any) => {
          this.adminLayoutService.getGeneralInfoListByID({ _id: x.id }).subscribe((res: any) => {
            this.generalTabForm.patchValue(res.data);
            this.generalTabForm.controls['allowKioskLogin'].setValue(res.data.allowKioskLogin.toString())
            this.generalTabForm.controls['allowMobile'].setValue(res.data.allowMobile.toString())
            this.generalTabForm.controls['isSalaried'].setValue(res.data.isSalaried.toString())

            console.log(this.generalTabForm.value);
          })
        })
      }
    }, 500);

  }

  // general form code here start
  defaultGeneralForm() {
    this.generalTabForm = this.fb.group({
      _id: [''],
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      role: [null, [Validators.required]],
      location: [null, [Validators.required]],

      password: ['', [Validators.required]],
      kioskPin: ['', [Validators.required]],
      allowKioskLogin: ['', [Validators.required]],
      allowMobile: ['', [Validators.required]],
      isSalaried: ['', [Validators.required]],
      salaryAmount: ['']
    })
  }

  generalInfoSave() {
    if (this.generalTabForm.invalid) {
      this.submittedGeneralInfo = true;
      return
    }
    let generalInfoId = {
      _id: this.generalTabForm.value._id
    }
    let generalInfoObj = {
      firstName: this.generalTabForm.value.firstName,
      lastName: this.generalTabForm.value.lastName,
      email: this.generalTabForm.value.email,
      mobile: this.generalTabForm.value.mobile,
      role: this.generalTabForm.value.role,
      location: this.generalTabForm.value.location,
      password: this.generalTabForm.value.password,
      kioskPin: this.generalTabForm.value.kioskPin,
      allowKioskLogin: JSON.parse(this.generalTabForm.value.allowKioskLogin),
      allowMobile: JSON.parse(this.generalTabForm.value.allowMobile),
      isSalaried: JSON.parse(this.generalTabForm.value.isSalaried),
      salaryAmount: this.generalTabForm.value.salaryAmount
    }
    console.log("generalInfoObj", generalInfoObj);

    this.adminLayoutService.saveGeneralInfoData(generalInfoObj, generalInfoId).subscribe((Response: any) => {
      if (Response.meta.code == 200) {

        this.generalTabForm.controls['_id'].setValue(Response.data._id);
        this.generalStep = true;
        this.activeTab = 2

        if (this.router.url.includes('peoples/update-new-people')) {
          this.stepComplete(1)
        }
        // if (this.profileTabForm.value.state) {
        //   this.service.getCitiesByState('IN', this.profileTabForm.value.state.isoCode)
        // }

      }
    }, (error) => {
      console.log("Error", error);
    })
  }


  // general form code here end

  // profile form code here start
  defaultProfileForm() {
    this.profileTabForm = this.fb.group({
      gender: [null, [Validators.required]],
      birthDate: [null],
      displayName: ['', [Validators.required]],
      hireDate: [null, [Validators.required]],
      height: [''],
      weight: [''],
      bloodGroup: [''],

      jobPosition: [null, [Validators.required]],
      address: [''],
      country: ['India', [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],

      emergencyContactName: ['', [Validators.required]],
      emergencyContactNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    })
  }

  preview(files: any) {
    this.profilePicture = files[0];
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType == "image/jpeg" || mimeType == "image/png" || mimeType == "image/gif") {
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }
  removeuploadFile() {

    this.profilePicture = "";
    this.imgURL = "";
    this.profilePictureVariable.nativeElement.value = "";
  }

  profileInfoSave() {
    if (this.profileTabForm.invalid) {
      this.submittedProfileInfo = true;
      return;
    }
    let profileFormObjId = {
      _id: this.generalTabForm.value._id
    }
    let profileFormObjData: FormData = new FormData();
    profileFormObjData.append('profilePicture', this.profilePicture);
    profileFormObjData.append('gender', this.profileTabForm.value.gender);
    profileFormObjData.append('birthDate', this.profileTabForm.value.birthDate);
    profileFormObjData.append('displayName', this.profileTabForm.value.displayName);
    profileFormObjData.append('hireDate', this.profileTabForm.value.hireDate);
    profileFormObjData.append('height', this.profileTabForm.value.height);
    profileFormObjData.append('weight', this.profileTabForm.value.weight);
    profileFormObjData.append('bloodGroup', this.profileTabForm.value.bloodGroup);

    profileFormObjData.append('jobPosition', this.profileTabForm.value.jobPosition);
    profileFormObjData.append('address', this.profileTabForm.value.address);
    profileFormObjData.append('country', this.profileTabForm.value.country);
    profileFormObjData.append('state', this.profileTabForm.value.state.name);
    profileFormObjData.append('city', this.profileTabForm.value.city);

    profileFormObjData.append('emergencyContactName', this.profileTabForm.value.emergencyContactName);
    profileFormObjData.append('emergencyContactNo', this.profileTabForm.value.emergencyContactNo);


    this.adminLayoutService.saveGeneralInfoData(profileFormObjData, profileFormObjId).subscribe((Response: any) => {
      if (Response.meta.code == 200) {

        this.generalTabForm.controls['_id'].setValue(Response.data._id);
        this.activeTab = 3;
        this.profileStep = true;
      }
    }, (error) => {
      console.log("Error", error);
    })

  }
  // profile form code here end

  onStateChange() {
    this.service.getCitiesByState('IN', this.profileTabForm.value.state.isoCode)
    this.profileTabForm.controls['city'].setValue(null);
  }

  stepComplete(stepNo: number) {
    if (stepNo == 1) {
      this.adminLayoutService.getGeneralInfoListByID({ _id: this.generalTabForm.value._id }).subscribe((res: any) => {
        this.profileTabForm.patchValue(res.data);
        if (res.data.profilePicture) {
          this.imgURL = this.commonService.rootData.uploadsUrl + 'photos/' + res.data.profilePicture;
          this.profilePicture = res.data.profilePicture
        }


        if (res.data.birthDate && !!res.data.birthDate && res.data.birthDate != 'null') {
          this.profileTabForm.controls['birthDate'].setValue(new Date(res.data.birthDate));
        }
        else {
          this.profileTabForm.controls['birthDate'].setValue(null);
        }
        this.profileTabForm.controls['hireDate'].setValue(new Date(res.data.hireDate));
        const stateValueSet = this.stateList.filter((x: any) => x.name == res.data.state)[0];
        this.profileTabForm.controls['state'].setValue(stateValueSet);
        const stateIsoCode = stateValueSet.isoCode
        this.service.getCitiesByState('IN', stateIsoCode)
      })
    }
    else if (stepNo == 2) {

    }
    else if (stepNo == 3) {
      this.router.navigateByUrl('/admin/peoples')
    }
  }

  previousStep(stepNo: number) {
    if (stepNo == 1) {
      this.adminLayoutService.getGeneralInfoListByID({ _id: this.generalTabForm.value._id }).subscribe((res: any) => {
        this.generalTabForm.patchValue(res.data);

        this.generalTabForm.controls['role'].setValue(res.data.role.toString())
        this.generalTabForm.controls['allowKioskLogin'].setValue(res.data.allowKioskLogin.toString())
        this.generalTabForm.controls['allowMobile'].setValue(res.data.allowMobile.toString())
        this.generalTabForm.controls['isSalaried'].setValue(res.data.isSalaried.toString())

        console.log(this.generalTabForm.value);
        this.activeTab = 1;
        this.generalStep = false;
        this.profileStep = false;
      })

    }
    else if (stepNo == 2) {
      this.adminLayoutService.getGeneralInfoListByID({ _id: this.generalTabForm.value._id }).subscribe((res: any) => {
        this.profileTabForm.patchValue(res.data);

        if (res.data.profilePicture) {
          this.imgURL = this.commonService.rootData.uploadsUrl + 'photos/' + res.data.profilePicture;
          this.profilePicture = res.data.profilePicture;
        }

        if (res.data.birthDate && !!res.data.birthDate && res.data.birthDate != 'null') {
          this.profileTabForm.controls['birthDate'].setValue(new Date(res.data.birthDate));
        }
        else {
          this.profileTabForm.controls['birthDate'].setValue(null);
        }
        this.profileTabForm.controls['hireDate'].setValue(new Date(res.data.hireDate));

        const stateValueSet = this.stateList.filter((x: any) => x.name == res.data.state)[0];
        this.profileTabForm.controls['state'].setValue(stateValueSet);


        const stateIsoCode = stateValueSet.isoCode

        this.service.getCitiesByState('IN', stateIsoCode)

        this.activeTab = 2;
        this.generalStep = true;
        this.profileStep = false;
        this.schdulingStep = false;
      })

    }
  }




  jobPositionName = '';
  submittedJobPositionName: boolean = false;
  addNewPosition() {
    this.jobPositionName = '';
    this.submittedJobPositionName = false;
    $('#whoIsWorking').modal('show');
  }
  saveJobPosition() {
    if (!this.jobPositionName) {
      this.submittedJobPositionName = true;
      return
    }
    this.adminLayoutService.saveJobPosition({ name: this.jobPositionName }).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.adminLayoutService.getJobPositionList();
        $('#whoIsWorking').modal('hide');
        this.jobPositionName = '';
        this.submittedJobPositionName = false;

        this.adminLayoutService.alertShow({
          type: 'success', message: 'Job Position added Successfully.'
        });

      }
    })

  }

}
