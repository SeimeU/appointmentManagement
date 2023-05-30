import { Injectable } from '@angular/core';
import {Appointment} from "../Appointment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppointmentSeries} from "../AppointmentSeries";

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

  constructor(private http:HttpClient) { }

  set district(value: string) {
    this._district = value;
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl + 'appointments-loc?location=' + this._district);
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl + 'all-appointments');
  }

  getNumberOfFreeAppointments(): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'number-of-free-appointments-loc?location=' + this._district);
  }

  getNumberOfAppointments(): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'number-of-appointments-loc?location=' + this._district);
  }

  getAppointmentSeries(): Observable<AppointmentSeries[]> {
    return this.http.get<AppointmentSeries[]>(this.apiUrl + 'appointments-series-loc?location=' + this._district);
  }

  deleteAppointment(appointment: Appointment): void {
    const url = this.apiUrl + 'appointment/' + appointment.id;
    this.http.delete<void>(url);
  }

  deleteAppointmentSeries(appointmentSeries: AppointmentSeries): void {
    const url = this.apiUrl + 'appointment-series/' + appointmentSeries.id;
    this.http.delete<void>(url);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl + 'appointment', appointment, httpOptions);
  }

  createAppointmentSeries(appointmentSeries: AppointmentSeries): Observable<AppointmentSeries> {
    return this.http.post<AppointmentSeries>(this.apiUrl + 'appointment-series', appointmentSeries, httpOptions);
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl + 'save-appointment', appointment, httpOptions);
  }

  updateAppointmentSeries(appointmentSeries: AppointmentSeries): Observable<AppointmentSeries> {
    return this.http.post<AppointmentSeries>(this.apiUrl + 'save-appointment-series', appointmentSeries, httpOptions);
  }

  checkAppointmentPossible(appointment: Appointment): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + 'is-appointment-valid', appointment, httpOptions);
  }

  checkAppointmentsSeriesPossible(appointmentSeries: AppointmentSeries): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + 'is-appointment-series-valid', appointmentSeries, httpOptions);
  }
}
