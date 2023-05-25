import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationAndMedicineService {
  private apiUrl = 'http://localhost:9192/';

  constructor(private http:HttpClient) { }

  getLocationsWithCapacity(district: string): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'locations/' + district);
  }

  getLinesOfLocation(location: string): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'location/' + location + "/lines");
  }

  getSubstancesOfLine(location: string, line: string): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'location/' + location + '/line/' + line + '/substances');
  }
}
