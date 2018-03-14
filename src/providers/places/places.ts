import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {GOOGLE_API_KEY} from "../../app/env";

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {

  constructor(public http: HttpClient) {

  }

  getAddressBasedPnLatLnd(lat: number, lng: number) {
    return new Promise((resolve, reject) => {
      this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key${GOOGLE_API_KEY}`)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

}
