import { Injectable } from '@angular/core';
import { Country, State, City } from 'country-state-city';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryStateCityService {

  constructor() { }
  country: any = null;
  state: any = null;
  city: any = null;

  private countryDataSource = new BehaviorSubject<any>(this.country);
  countryData = this.countryDataSource.asObservable();

  private stateDataSource = new BehaviorSubject<any>(this.state);
  stateData = this.stateDataSource.asObservable();

  private cityDataSource = new BehaviorSubject<any>(this.city);
  cityData = this.cityDataSource.asObservable();

  getCountries() {
    let data = Country.getAllCountries();
    this.country = []
    data.forEach((x: any) => {
      this.country.push(x);
    })
    this.countryDataSource.next(this.country);
  }

  getStatesByCountry(countryIsoCode: any) {
    let data = State.getStatesOfCountry(countryIsoCode);
    this.state = []
    data.forEach((x: any) => {
      this.state.push(x);
    })
    this.stateDataSource.next(this.state);
  }

  getCitiesByState(countryIsoCode: string, stateIsoCode: string) {
    let data = City.getCitiesOfState(countryIsoCode, stateIsoCode);
    this.city = [];
    this.city = data;
    this.cityDataSource.next(this.city);
  }

}
