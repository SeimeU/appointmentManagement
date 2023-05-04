import { Injectable } from '@angular/core';
import {Appointment} from "../Appointment";
import {APPOINTMENTS} from "../temp";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() { }

  getAppointments(): Observable<Appointment[]> {
    const appointments = of(APPOINTMENTS);
    return appointments;
  }
}
