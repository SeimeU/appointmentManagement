import { Injectable } from '@angular/core';
import {Appointment} from "../entities/Appointment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppointmentSeries} from "../entities/AppointmentSeries";
import {LocationAndMedicineService} from "./location-and-medicine.service";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  //region Fields
  private apiUrl: string = 'http://localhost:9193/';
  private _district: string = "";
  private _locations: string[] = [];
  //endregion

  constructor(private http:HttpClient, private locService: LocationAndMedicineService) { }

  set district(value: string) {
    this._district = value;
    this.locService.district = value;
    this.locService.getLocationsWithCapacity().subscribe(loc => this._locations = loc);
  }

  get locations(): string[] {
    return this._locations;
  }

  set locations(value: string[]) {
    this._locations = value;
  }

  // Function to make the http-request to get all appointments for the locations in the selected district
  getAppointments(): Observable<Appointment[]> {
    let url: string = this.apiUrl + 'appointments-loc?';

    if(this._locations.length != 0) {
      // Create url with all locations as get parameters
      this._locations.forEach(loc => url += 'location=' + loc + '&');

      // Delete the ending &
      url.slice(0, -1);
      return this.http.get<Appointment[]>(url);
    }

    return new Observable<Appointment[]>();
  }

  // Function to make the http-request to get the number of free appointments for the locations in the selected district
  getNumberOfFreeAppointments(): Observable<number> {
    let url: string = this.apiUrl + 'number-of-free-appointments-loc?';

    if(this._locations.length != 0) {
      // Create url with all locations as get parameters
      this._locations.forEach(loc => url += 'location=' + loc + '&');

      // Delete the ending &
      url.slice(0, -1);
      return this.http.get<number>(url);
    }

    return new Observable<number>();
  }

  // Function to make the http-request to get the number of appointments for the locations in the selected district
  getNumberOfAppointments(): Observable<number> {
    let url: string = this.apiUrl + 'number-of-appointments-loc?';

    if(this._locations.length != 0) {
      // Create url with all locations as get parameters
      this._locations.forEach(loc => url += 'location=' + loc + '&');

      // Delete the ending &
      url.slice(0, -1);
      return this.http.get<number>(url);
    }

    return new Observable<number>();
  }


  // Function to make the http-request to get the appointment series for the locations in the selected district
  getAppointmentSeries(): Observable<AppointmentSeries[]> {
    let url: string = this.apiUrl + 'appointments-series-loc?';

    if(this._locations.length != 0) {
      // Create url with all locations as get parameters
      this._locations.forEach(loc => url += 'location=' + loc + '&');

      // Delete the ending &
      url.slice(0, -1);
      return this.http.get<AppointmentSeries[]>(url);
    }

    return new Observable<AppointmentSeries[]>();
  }


  // Function to make the http-request to delete an appointment
  deleteAppointment(appointment: Appointment): void {
    const url = this.apiUrl + 'appointment?id=' + appointment.id;
    this.http.delete(url).subscribe();
  }

  // Function to make the http-request to delete an appointment series
  deleteAppointmentSeries(appointmentSeries: AppointmentSeries): void {
    const url = this.apiUrl + 'appointment-series?id=' + appointmentSeries.id;
    this.http.delete(url).subscribe();
  }


  // Function to make the http-request to save the appointment
  saveAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl + 'appointment', appointment, httpOptions);
  }

  // Function to make the http-request to save the appointment series
  saveAppointmentSeries(appointmentSeries: AppointmentSeries): Observable<AppointmentSeries> {
    return this.http.post<AppointmentSeries>(this.apiUrl + 'appointment-series', appointmentSeries, httpOptions);
  }


  // Function to make the http-request to check if the appointment is valid - there is no other appointment on this location, line and date/time
  checkAppointmentPossible(appointment: Appointment): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + 'is-appointment-valid', appointment, httpOptions);
  }

  // Function to make the http-request to check if the appointment series is valid - there are no other appointments on this location, line and date/time
  checkAppointmentsSeriesPossible(appointmentSeries: AppointmentSeries): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + 'is-appointment-series-valid', appointmentSeries, httpOptions);
  }

  // Function to make the http-request to get the number of appointments the specified appointment series would create
  getNumberOfAppointmentsInAppointmentSeries(appointmentSeries: AppointmentSeries): Observable<number> {
    return this.http.put<number>(this.apiUrl + 'appointment-series/number-of-appointments', appointmentSeries);
  }
}
