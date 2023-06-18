import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../../entities/Appointment";
import {FormControl} from "@angular/forms";
import {LocationAndMedicineService} from "../../services/location-and-medicine.service";
import {AppointmentService} from "../../services/appointment.service";

@Component({
  selector: 'app-appointment-editor',
  templateUrl: './appointment-editor.component.html',
  styleUrls: ['./appointment-editor.component.css']
})
export class AppointmentEditorComponent implements OnInit{
  //region Form Controls
  @Input('formControl') locationForm: FormControl;
  @Input('formControl') lineForm: FormControl;
  @Input('formControl') dateForm: FormControl;
  @Input('formControl') timeForm: FormControl;
  @Input('formControl') durationForm: FormControl;
  @Input('formControl') substanceForm: FormControl;
  @Input('formControl') bookedForm: FormControl;
  //endregion

  //region Variables for validation
  dateBeforeMin: boolean;
  timeBeforeMin: boolean;
  //endregion


  //region Auxiliary variables
  disableDuration: boolean = true;
  isBooked: any;
  minDate: Date;

  locations: string[] = [];

  durations: number[] = [];

  lines: number[] = [];

  substances: string[] = [];

  //endregion

  constructor(public dialogRef: MatDialogRef<AppointmentEditorComponent>, @Inject(MAT_DIALOG_DATA) public data: Appointment, private locService: LocationAndMedicineService, private appointmentService: AppointmentService) {
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

  ngOnInit(): void {
    // Get the selection possibilities for the current selection
    this.locService.getLocationsWithCapacity().subscribe(loc => this.locations = loc);
    this.locService.getLinesOfLocation(this.data.location).subscribe(li => this.lines = li);
    this.locService.getDurationOfLocation(this.data.location).subscribe(dur => {
      this.durations = [dur];
      this.durationForm.setValue(dur);
    });
    this.locService.getSubstancesOfLine(this.data.location, this.data.line).subscribe(sub => this.substances = sub);
  }

  // Event handler for location selection
  onLocationChanged(event: any) {
    // Reset the line and substance - adjust it to new location
    this.lineForm.setValue(null);
    this.substanceForm.setValue(null);

    // Make the http-requests to get the duration and the lines on the selected location
    this.locService.getLinesOfLocation(event.value).subscribe(li => this.lines = li);
    this.locService.getDurationOfLocation(event.value).subscribe(dur => {
      this.durations = [dur];
      this.durationForm.setValue(dur);
    });
    this.substances = [];
  }

  // Event handler for line selection
  onLineChanged(event: any) {
    if(event.value != null && this.locationForm.value != null) {
      this.substanceForm.setValue(null);

      // Make the http-request to get the substances for the selected line and location
      this.locService.getSubstancesOfLine(this.locationForm.value, event.value).subscribe(sub => this.substances = sub);
    }
  }

  // Event handler for delete click
  onDeleteClick() {
    // Create an appointment object with the deleted flag set to true
    let appointment: Appointment = {
      id: this.data.id,
      location: this.data.location,
      line: this.data.line,
      date: this.data.date,
      duration: this.data.duration,
      substance: this.data.substance,
      booked: this.data.booked,
      deleted: true
    }

    // Close the popup and return the appointment to delete
    this.dialogRef.close(appointment);
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

    // Add two hours because of time offset
    inputDate.setHours(hours+2, minutes);

    if (inputDate < new Date()) {
      this.timeBeforeMin = true;
      validInput = false;
    }

    if (!validInput) {
      // Date input is not valid - show error messages
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

    this.appointmentService.checkAppointmentPossible(appointment).subscribe(valid => {
      // Check if there is already an appointment on this location, line and time
      if (!valid) {
        alert('Es is bereits ein Termin an diesem Standort auf dieser Linie zur gewünschten Zeit vorhanden!');
        return;
      }

      // Close popup and return the data
      this.dialogRef.close(appointment);
    });
  }
}




