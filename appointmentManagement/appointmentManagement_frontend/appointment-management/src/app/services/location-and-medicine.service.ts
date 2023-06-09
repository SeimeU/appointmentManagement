import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationAndMedicineService {
  //region Fields
  private apiUrl: string = 'http://localhost:9194/';
  private appointmentBookingUrl: string = 'http://localhost:9192/';
  private _district: string = "";
  //endregion

  constructor(private http:HttpClient) { }

  get district(): string {
    return this._district;
  }

  set district(value: string) {
    this._district = value;
  }


  // Function to make the http-request to get all locations with capacity
  getLocationsWithCapacity(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + "locations/stock/" + this._district);
  }

  // Function to make the http-request to get the duration specified for this location
  getDurationOfLocation(location: string): Observable<number> {
    return this.http.get<number>(this.apiUrl + "locations/" + location + "/duration");
  }

  // Function to make the http-request to get all lines for the specified location
  getLinesOfLocation(location: string): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl + "locations/" + location + "/lines");
  }

  // Function to make the http-request to get all substances for the selected line and location
  getSubstancesOfLine(location: string, line: number): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + "locations/" + location + '/line/' + line + '/articles');
  }

  // Function to make the http-request to get the capacity for the selected line, location and substance
  getNumberOfSubstancesOfLine(location: string, line: number, substance: string): Observable<number> {
    return this.http.get<number>(this.apiUrl + "locations/" + location + '/line/' + line + '/articles/' + substance);
  }

  // Function to make the http-request to subtract the capacity if an appointment gets created
  setSubstanceAppointment(location: string, line: number, substance: string): void {
    this.http.post<any>(this.apiUrl + 'lines/create-appointment/' + location + '/line/' + line, substance).subscribe();
  }

  // Function to make the http-request to set free the capacity and set the delete flag for this appointment in the booking application
  setAppointmentDeleted(id: number, location: string, line: number, substance: string): void {
    this.http.put<any>(this.appointmentBookingUrl + 'booked-appointments/' + id, id).subscribe();
    this.http.post<any>(this.apiUrl + 'lines/set-free/' + location + '/line/' + line, substance).subscribe();
  }
}
