import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { AdminLayoutService } from 'src/app/Layout/admin-layout/admin-layout.service';
import { CountryStateCityService } from 'src/app/Layout/admin-layout/country-state-city.service';

@Component({
  selector: 'app-add-new-location',
  templateUrl: './add-new-location.component.html',
  styleUrls: ['./add-new-location.component.css']
})
export class AddNewLocationComponent implements OnInit {

  leaveTypeList = ['Company', 'Organization'];
  countryList: any[] = []
  stateList: any[] = [];
  submittedGeneralTab: boolean = false;

  generalTabForm: FormGroup;
  get fgeneralData(): { [key: string]: AbstractControl } {
    return this.generalTabForm.controls;
  }

  // options: Options = new Options({
  //   bounds: undefined, fields: ["address_component"], strictBounds: false,
  //   types: ['geocode', 'route'],
  //   componentRestrictions: { country: 'in' }
  // });

  constructor(public fb: FormBuilder, public service: CountryStateCityService, public route: ActivatedRoute, public router: Router, public adminLayoutService: AdminLayoutService) { }

  ngOnInit(): void {
    this.defaultGeneralTabForm();


    // setup country observable
    this.service.countryData.subscribe(data => {
      this.countryList = data;
    })

    // setup state observable
    this.service.stateData.subscribe(data => {
      this.stateList = data;
    })

    this.service.getCountries();

    if (this.router.url.includes('/admin/location/update-location')) {
      this.route.params.subscribe((x: any) => {
        this.adminLayoutService.getLocationMasterById({ _id: x.id }).subscribe((Response: any) => {
          if (Response.meta.code == 200) {
            this.generalTabForm.patchValue(Response.data);
          }
        })
      })
    }

  }


  defaultGeneralTabForm() {
    this.generalTabForm = this.fb.group({
      _id: [''],
      name: ['', [Validators.required]],
      outletType: [null, [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)]],
      fax: [''],
      contactNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],

      address: ['', [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, Validators.required],
      postalCode: ['']
    })
  }

  onCountryChange() {
    this.service.getStatesByCountry(this.generalTabForm.value.country.isoCode);
    this.generalTabForm.controls['state'].setValue(null);
  }



  generalTabSave() {
    if (this.generalTabForm.invalid) {
      this.submittedGeneralTab = true;
      return;
    }

    let generalTabObjId = {
      _id: this.generalTabForm.value._id
    }

    let generalTabObj = {
      name: this.generalTabForm.value.name,
      outletType: this.generalTabForm.value.outletType,
      email: this.generalTabForm.value.email,
      fax: this.generalTabForm.value.fax,
      contactNo: this.generalTabForm.value.contactNo,
      address: this.generalTabForm.value.address,
      state: this.generalTabForm.value.state.name,
      country: this.generalTabForm.value.country.name,
      postalCode: this.generalTabForm.value.postalCode,
    }

    this.adminLayoutService.saveUpdateLocationMaster(generalTabObj, generalTabObjId).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        if (this.generalTabForm.value._id) {
          this.adminLayoutService.alertShow({
            type: 'success', message: 'Location Updated Successfully.'
          });
        }
        else {
          this.adminLayoutService.alertShow({
            type: 'success', message: 'Location added Successfully.'
          });
        }
        this.router.navigateByUrl('/admin/location')
      }
    })

  }




















  // public handleAddressChange(address: any) {
  // this.formattedAddress = address.formatted_address;
  // this.jobtmasterForm.controls.locationName.setValue(address.formatted_address)
  // this.jobtmasterForm.controls.lat.setValue(address.geometry.location.lat())
  // this.jobtmasterForm.controls.log.setValue(address.geometry.location.lng())


  // address.address_components.forEach(obj => {

  //   if (obj.types[0] == "administrative_area_level_1") {
  //     this.jobtmasterForm.controls.stateName.setValue(obj.short_name);
  //     this.onStateChange(2);
  //     console.log('stateName', obj.long_name);
  //   }
  //   if (obj.types[0] == "locality") {
  //     this.jobtmasterForm.controls.cityName.setValue(obj.long_name)
  //     console.log('cityName', obj.long_name);
  //   }
  //   if (obj.types[0] == "postal_code") {
  //     this.jobtmasterForm.controls.postalCode.setValue(obj.long_name)
  //     console.log('postalCode', obj.long_name);
  //   }
  // });
  // this.Lat = address.geometry.location.lat();
  // this.Long = address.geometry.location.lng();
  // this.location = [this.Lat, this.Long]

  // }

}
