import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showDaily: boolean = false;
  private showWeekly: boolean = false;
  private showMonthly: boolean = false;
  private showYearly: boolean = false;
  private subjectDaily = new Subject<any>();
  private subjectWeekly = new Subject<any>();
  private subjectMonthly = new Subject<any>();
  private subjectYearly = new Subject<any>();

  constructor() { }

  toggleForm(form:string) {
    switch (form) {
      case 'daily':
        this.showDaily = !this.showDaily;
        if(this.showDaily) {
          this.showWeekly = false;
          this.showMonthly = false;
          this.showYearly = false;
        }
        break;
      case 'weekly':
        this.showWeekly = !this.showWeekly;
        if(this.showWeekly) {
          this.showDaily = false;
          this.showMonthly = false;
          this.showYearly = false;
        }
        break;
      case 'monthly':
        this.showMonthly = !this.showMonthly;
        if(this.showMonthly) {
          this.showDaily = false;
          this.showWeekly = false;
          this.showYearly = false;
        }
        break;
      case 'yearly':
        this.showYearly = !this.showYearly;
        if(this.showYearly) {
          this.showDaily = false;
          this.showMonthly = false;
          this.showWeekly = false;
        }
        break;
      case undefined:
        this.showDaily = false;
        this.showWeekly = false;
        this.showMonthly = false;
        this.showYearly = false;
        break;
    }
    this.subjectDaily.next(this.showDaily);
    this.subjectWeekly.next(this.showWeekly);
    this.subjectMonthly.next(this.showMonthly);
    this.subjectYearly.next(this.showYearly);
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

  onToggleYearly(): Observable<any> {
    return this.subjectYearly.asObservable();
  }
}
