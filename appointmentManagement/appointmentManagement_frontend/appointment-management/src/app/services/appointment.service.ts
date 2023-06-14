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
  private apiUrl: string = 'http://localhost:9193/';
  private _district: string = "";
  private _locations: string[] = [];

  constructor(private http:HttpClient, private locService: LocationAndMedicineService) { }

  set district(value: string) {
    this._district = value;
    this.locService.district = value;
    //this.locService.getLocationsOfDistrict().subscribe(loc => this._locations = loc);
  }

  get locations(): string[] {
    return this._locations;
  }

  set locations(value: string[]) {
    this._locations = value;
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl + 'appointments-loc?location=' + this._district);

    /*
    let url: string = this.apiUrl + 'appointments-loc?';

    // Create url with all locations as get parameters
    this._locations.forEach(loc => url += 'location=' + loc + '&');

    // Delete the ending &
    url.slice(0, -1);
    return this.http.get<Appointment[]>(url);*/
  }

  getNumberOfFreeAppointments(): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'number-of-free-appointments-loc?location=' + this._district);

    /*
    let url: string = this.apiUrl + 'number-of-free-appointments-loc?';

    // Create url with all locations as get parameters
    this._locations.forEach(loc => url += 'location=' + loc + '&');

    // Delete the ending &
    url.slice(0, -1);
    return this.http.get<number>(url);*/
  }

  getNumberOfAppointments(): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'number-of-appointments-loc?location=' + this._district);

    /*
    let url: string = this.apiUrl + 'number-of-appointments-loc?';

    // Create url with all locations as get parameters
    this._locations.forEach(loc => url += 'location=' + loc + '&');

    // Delete the ending &
    url.slice(0, -1);
    return this.http.get<number>(url);*/
  }

  getAppointmentSeries(): Observable<AppointmentSeries[]> {
    return this.http.get<AppointmentSeries[]>(this.apiUrl + 'appointments-series-loc?location=' + this._district);

    /*
    let url: string = this.apiUrl + 'appointments-series-loc?';

    // Create url with all locations as get parameters
    this._locations.forEach(loc => url += 'location=' + loc + '&');

    // Delete the ending &
    url.slice(0, -1);
    return this.http.get<AppointmentSeries[]>(url);*/
  }

  deleteAppointment(appointment: Appointment): void {
    const url = this.apiUrl + 'appointment?id=' + appointment.id;
    this.http.delete(url).subscribe();
  }

  deleteAppointmentSeries(appointmentSeries: AppointmentSeries): void {
    const url = this.apiUrl + 'appointment-series?id=' + appointmentSeries.id;
    this.http.delete(url).subscribe();
  }

  saveAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl + 'appointment', appointment, httpOptions);
  }

  saveAppointmentSeries(appointmentSeries: AppointmentSeries): Observable<AppointmentSeries> {
    return this.http.post<AppointmentSeries>(this.apiUrl + 'appointment-series', appointmentSeries, httpOptions);
  }

  checkAppointmentPossible(appointment: Appointment): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + 'is-appointment-valid', appointment, httpOptions);
  }

  checkAppointmentsSeriesPossible(appointmentSeries: AppointmentSeries): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + 'is-appointment-series-valid', appointmentSeries, httpOptions);
  }
}
