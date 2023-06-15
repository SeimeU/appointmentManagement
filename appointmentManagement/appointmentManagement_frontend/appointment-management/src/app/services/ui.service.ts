import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Appointment} from "../entities/Appointment";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  //region Fields
  private showDaily: boolean = false;
  private showWeekly: boolean = false;
  private showMonthly: boolean = false;
  private subjectDaily = new Subject<any>();
  private subjectWeekly = new Subject<any>();
  private subjectMonthly = new Subject<any>();
  private subjectRemoveAppointment = new Subject<number>();
  private subjectAddAppointment = new Subject<Appointment>();
  //endregion


  constructor() { }

  // Function to toggle the displayed form
  toggleForm(form:string) {
    switch (form) {
      case 'daily':
        this.showDaily = !this.showDaily;
        if(this.showDaily) {
          this.showWeekly = false;
          this.showMonthly = false;
        }
        break;
      case 'weekly':
        this.showWeekly = !this.showWeekly;
        if(this.showWeekly) {
          this.showDaily = false;
          this.showMonthly = false;
        }
        break;
      case 'monthly':
        this.showMonthly = !this.showMonthly;
        if(this.showMonthly) {
          this.showDaily = false;
          this.showWeekly = false;
        }
        break;
      case '':
        this.showDaily = false;
        this.showWeekly = false;
        this.showMonthly = false;
        break;
    }
    this.subjectDaily.next(this.showDaily);
    this.subjectWeekly.next(this.showWeekly);
    this.subjectMonthly.next(this.showMonthly);
  }

  onToggleDaily(): Observable<any> {
    return this.subjectDaily.asObservable();
  }

  onToggleWeekly(): Observable<any> {
    return this.subjectWeekly.asObservable();
  }

  onToggleMonthly(): Observable<any> {
    return this.subjectMonthly.asObservable();
  }

  // Function to remove an appointment from the appointment table
  removeAppointment(id: number) {
    this.subjectRemoveAppointment.next(id);
  }

  // Function to add an appointment to the appointment table
  addAppointment(appointment: Appointment) {
    this.subjectAddAppointment.next(appointment);
  }

  onRemoveAppointment(): Observable<number> {
    return this.subjectRemoveAppointment.asObservable();
  }

  onAddAppointment(): Observable<Appointment> {
    return this.subjectAddAppointment.asObservable();
  }
}
