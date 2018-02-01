import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GeocoderService {

  constructor(private http: Http) { }

  getAddr(point: [number, number]) {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${point.join(',')}`)
      .toPromise()
      .then(response => response.json())
      .then(json => json);
  }
}
