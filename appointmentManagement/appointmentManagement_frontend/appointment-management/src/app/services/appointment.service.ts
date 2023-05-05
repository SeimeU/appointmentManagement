import { Injectable } from '@angular/core';
import {Appointment} from "../Appointment";
import {APPOINTMENTS} from "../temp";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:9194/appointments';

  constructor(private http:HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    const appointments = of(APPOINTMENTS);
    return appointments;
    //return this.http.get<Appointment[]>(this.apiUrl)
  }
}
