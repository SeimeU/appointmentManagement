import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationAndMedicineService {
  private apiUrl = 'http://localhost:9192/';
  private _district: string = "";

  constructor(private http:HttpClient) { }


  get district(): string {
    return this._district;
  }

  set district(value: string) {
    this._district = value;
  }

  getLocationsWithCapacity(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'locations/' + this._district);
  }

  getLocationsOfDistrict(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'locations/' + this._district);
  }

  getLinesOfLocation(location: string): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl + 'location/' + location + "/lines");
  }

  getSubstancesOfLine(location: string, line: number): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'location/' + location + '/line/' + line + '/substances');
  }
}
