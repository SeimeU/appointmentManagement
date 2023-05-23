import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../../Appointment";
import {UiService} from "../../services/ui.service";
import {min} from "rxjs";

interface TimePeriod {
  value: string;
  viewValue: string;
}

interface Select {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-appointment-creator',
  templateUrl: './appointment-creator.component.html',
  styleUrls: ['./appointment-creator.component.css']
})
export class AppointmentCreatorComponent {
  isBooked: any;
  minDate: Date;

  locations: string[] = [
    "Braunau",
    "Linz Landstraße",
    "Eferding"
  ];

  lines: number[] = [
    1, 2, 3, 4, 5
  ];

  duration: Select[] = [
    {value: 5, viewValue: '5min'},
    {value: 10, viewValue: '10min'},
    {value: 15, viewValue: '15min'},
    {value: 20, viewValue: '20min'},
    {value: 25, viewValue: '25min'},
    {value: 30, viewValue: '30min'},
    {value: 35, viewValue: '35min'},
    {value: 40, viewValue: '40min'},
    {value: 45, viewValue: '45min'},
    {value: 50, viewValue: '50min'},
    {value: 55, viewValue: '55min'},
    {value: 60, viewValue: '60min'}
  ];

  substances: string[] = [
    "Pfizer",
    "Moderna",
    "Medikament"
  ];

  timePeriod: TimePeriod[] = [
    {value: 'daily', viewValue: 'täglich'},
    {value: 'weekly', viewValue: 'wöchtenlich'},
    {value: 'monthly', viewValue: 'monatlich'}
  ];


  constructor(public dialogRef: MatDialogRef<AppointmentCreatorComponent>, private uiService: UiService, @Inject(MAT_DIALOG_DATA) public data: Appointment) {
    this.minDate = new Date()
  }

  ngOnInit(): void {
  }

  onChangeSelect(event: any) {
    this.uiService.toggleForm(event.value);
  }

  onStore(data: Appointment) {
    // check if date is not initialized - did not work with checking if null
    let dateNotInitialized: boolean = false;
    try {
      data.date.getDate()
    } catch (exception) {
      dateNotInitialized = true;
    }
    console.log(dateNotInitialized)




    if(data.duration == '' || dateNotInitialized || data.time == undefined || data.line == 0 || data.substance == '' || data.location == '') {
      this.dialogRef.close(null);
      return;
    }

    const [hours, minutes] = data.time.split(':').map(Number);
    data.date.setHours(hours, minutes);

    if(data.date < new Date(Date.now())) {
      alert("Test")
    }

    this.dialogRef.close(data);
  }

  timeToMinutes(time: string) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
