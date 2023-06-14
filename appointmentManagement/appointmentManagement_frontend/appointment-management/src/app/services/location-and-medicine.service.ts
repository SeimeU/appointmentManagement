import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationAndMedicineService {
  private apiUrl: string = 'http://localhost:9192/';
  private appointmentBookingUrl: string = 'http://localhost:9191/';
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

  getDurationOfLocation(location: string): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'location/' + location + "/duration");
  }

  getLinesOfLocation(location: string): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl + 'location/' + location + "/lines");
  }

  getSubstancesOfLine(location: string, line: number): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'location/' + location + '/line/' + line + '/substances');
  }

  setSubstanceAppointment(location: string, line: number, substance: string): void {
    this.http.post(this.apiUrl + '/create-appointment/' + location + '/line/' + line, substance);
  }

  setAppointmentDeleted(id: number, location: string, line: number, substance: string): void {
    this.http.put(this.appointmentBookingUrl + '/booked-appointments/' + id, id);
    this.http.post(this.apiUrl + '/set-free/' + location + '/line/' + line, substance);
  }
}
