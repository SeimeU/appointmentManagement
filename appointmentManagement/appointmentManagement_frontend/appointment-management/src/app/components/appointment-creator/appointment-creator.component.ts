import {Component, Input} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../../Appointment";
import {UiService} from "../../services/ui.service";
import {FormControl} from "@angular/forms";

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
export class AppointmentCreatorComponent{
  @Input('formControl') locationForm: FormControl;
  @Input('formControl') lineForm: FormControl;
  @Input('formControl') dateForm: FormControl;
  @Input('formControl') timeForm: FormControl;
  @Input('formControl') durationForm: FormControl;
  @Input('formControl') substanceForm: FormControl;
  @Input('formControl') bookedForm: FormControl;

  // Variables for validation
  dateBelowMin: boolean;
  timeBelowMin: boolean;


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


  constructor(public dialogRef: MatDialogRef<AppointmentCreatorComponent>, private uiService: UiService) {
    this.minDate = new Date();
    this.dateBelowMin = false;
    this.timeBelowMin = false;
    this.locationForm = new FormControl();
    this.lineForm = new FormControl();
    this.dateForm = new FormControl();
    this.timeForm = new FormControl();
    this.durationForm = new FormControl();
    this.substanceForm = new FormControl();
    this.bookedForm = new FormControl();
  }

  onChangeSelect(event: any) {
    this.uiService.toggleForm(event.value);
  }

  onStore() {
    // Validate input
    let validInput: boolean = true;

    if(this.locationForm.value == null) {
      this.locationForm.markAsTouched();
      validInput = false;
    }

    if(this.lineForm.value == null) {
      this.lineForm.markAsTouched();
      validInput = false;
    }

    if(this.dateForm.value == null) {
      this.dateForm.markAsTouched();
      validInput = false;
    }

    // Get current date with time 00:00  to check if the date is below the min date
    let d: Date = new Date();
    d.setHours(0,0,0,0);

    if(this.dateForm.value < d) {
      this.dateBelowMin = true;
      validInput = false;
    }

    if(this.timeForm.value == null) {
      this.timeForm.markAsTouched();
      validInput = false;
    }

    if(this.durationForm.value == null) {
      this.durationForm.markAsTouched();
      validInput = false;
    }

    if(this.substanceForm.value == null) {
      this.substanceForm.markAsTouched();
      validInput = false;
    }

    if(!validInput) {
      //this.dialogRef.close(null);
      console.log('invalid input')
      return;
    }

    // Check if date und time is in the future
    const [hours, minutes] = this.timeForm.value.split(':').map(Number);
    let inputDate: Date = this.dateForm.value;
    inputDate.setHours(hours, minutes);

    if(inputDate < new Date()) {
      this.timeBelowMin = true;
      validInput = false;
    }

    if(!validInput) {
      //this.dialogRef.close(null);
      console.log('invalid input')
      return;
    }


    // Check if there is already an appointment on this location, line and time
    if(false) {
      alert('Es is bereits ein Termin an diesem Standort auf dieser Linie zur gewünschten Zeit vorhanden!');
      return;
    }

    let appointment: Appointment = {
      location: this.locationForm.value, line: this.lineForm.value, date: inputDate, duration: this.durationForm.value, substance: this.substanceForm.value, booked: this.bookedForm.value
    };

    this.dialogRef.close(appointment);
  }

  timeToMinutes(time: string) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
