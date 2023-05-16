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
  private apiUrl = 'http://localhost:9193/';

  constructor(private http:HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl + 'all-appointments');
  }

  getAppointmentSeries(): Observable<AppointmentSeries[]> {
    return this.http.get<AppointmentSeries[]>(this.apiUrl + 'appointment-series');
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
    return this.http.post<Appointment>(this.apiUrl + 'appointment/' + appointment.id, appointment, httpOptions);
  }

  updateAppointmentSeries(appointmentSeries: AppointmentSeries): Observable<AppointmentSeries> {
    return this.http.post<AppointmentSeries>(this.apiUrl + 'appointment-series/' + appointmentSeries.id, appointmentSeries, httpOptions);
  }
}
