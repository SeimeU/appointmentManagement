import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../../Appointment";
import {FormControl} from "@angular/forms";

interface Select {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-appointment-editor',
  templateUrl: './appointment-editor.component.html',
  styleUrls: ['./appointment-editor.component.css']
})
export class AppointmentEditorComponent{
  //region Form Controls
  @Input('formControl') locationForm: FormControl;
  @Input('formControl') lineForm: FormControl;
  @Input('formControl') dateForm: FormControl;
  @Input('formControl') timeForm: FormControl;
  @Input('formControl') durationForm: FormControl;
  @Input('formControl') substanceForm: FormControl;
  @Input('formControl') bookedForm: FormControl;
  //endregion

  //region Hard-coded selection arrays
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
  //endregion

  //region Variables for validation
  dateBeforeMin: boolean;
  timeBeforeMin: boolean;
  //endregion


  //region Auxiliary variables
  isBooked: any;
  minDate: Date;

  locations: string[] = [
    "Braunau",
    "Linz",
    "Eferding"
  ];

  lines: number[] = [
    1, 2, 3, 4, 5
  ];

  substances: string[] = [
    "Pfizer",
    "Moderna",
    "Medikament"
  ];

  //endregion

  constructor(public dialogRef: MatDialogRef<AppointmentEditorComponent>, @Inject(MAT_DIALOG_DATA) public data: Appointment) {
    // Set min date of datepickers to current date
    this.minDate = new Date();

    // Initialize validation variables
    this.dateBeforeMin = false;
    this.timeBeforeMin = false;

    // Get time component from data - check if the hours or minutes is only one digit - then add a leading 0
    let date: Date = new Date(data.date);
    let time: string = '';
    if(date.getHours() < 10) {
      time += "0";
    }
    time += date.getHours() + ":";
    if(date.getMinutes() < 10) {
      time += "0";
    }
    time += date.getMinutes();

    // Initialize form controls
    this.locationForm = new FormControl(data.location);
    this.lineForm = new FormControl(data.line);
    this.dateForm = new FormControl(data.date);
    this.timeForm = new FormControl(time);
    this.durationForm = new FormControl(data.duration);
    this.substanceForm = new FormControl(data.substance);
    this.bookedForm = new FormControl(data.booked);
  }

  // Event handler for delete click
  onDeleteClick() {
    console.log('Gelöscht');
    this.dialogRef.close(null);
  }

  // Event handler for creator popup
  onStore() {
    // Validate input
    this.timeBeforeMin = false;
    this.dateBeforeMin = false;

    let validInput: boolean = true;

    // Check if location input is empty
    if (this.locationForm.value == null) {
      this.locationForm.markAsTouched();
      validInput = false;
    }

    // Check if line input is empty
    if (this.lineForm.value == null) {
      this.lineForm.markAsTouched();
      validInput = false;
    }

    // Check if date input is empty
    if (this.dateForm.value == null) {
      this.dateForm.markAsTouched();
      validInput = false;
    }

    // Get current date with time 00:00  to check if the date is below the min date (= in the past)
    let d: Date = new Date();
    d.setHours(0, 0, 0, 0);

    if (this.dateForm.value < d) {
      this.dateBeforeMin = true;
      validInput = false;
    }

    // Check if time input is empty
    if (this.timeForm.value == null) {
      this.timeForm.markAsTouched();
      validInput = false;
    }

    // Check if duration input is empty
    if (this.durationForm.value == null) {
      this.durationForm.markAsTouched();
      validInput = false;
    }

    // Check if substance input is empty
    if (this.substanceForm.value == null) {
      this.substanceForm.markAsTouched();
      validInput = false;
    }

    if (!validInput) {
      // Some input is not valid - show error messages
      alert('Es müssen alle Felder ausgefüllt werden!');
      return;
    }

    // Check if date und time is in the future
    const [hours, minutes] = this.timeForm.value.split(':').map(Number);
    let inputDate: Date = new Date(this.dateForm.value);
    inputDate.setHours(hours, minutes);

    if (inputDate < new Date()) {
      this.timeBeforeMin = true;
      validInput = false;
    }

    if (!validInput) {
      // Some input is not valid - show error messages
      alert('Das Startdatum darf nicht in der Vergangenheit liegen!');
      return;
    }

    // Create appointment object with the data
    let appointment: Appointment = {
      id: this.data.id,
      location: this.locationForm.value,
      line: this.lineForm.value,
      date: inputDate,
      duration: this.durationForm.value,
      substance: this.substanceForm.value,
      booked: this.bookedForm.value
    };

    // Check if there is already an appointment on this location, line and time
    if (false) {
      alert('Es is bereits ein Termin an diesem Standort auf dieser Linie zur gewünschten Zeit vorhanden!');
      return;
    }

    // Close popup and return the data
    this.dialogRef.close(appointment);
  }
}




