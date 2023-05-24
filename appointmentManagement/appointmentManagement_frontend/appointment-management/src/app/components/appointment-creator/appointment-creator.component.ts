import {Component, Input} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../../Appointment";
import {UiService} from "../../services/ui.service";
import {FormControl} from "@angular/forms";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {AppointmentSeries} from "../../AppointmentSeries";

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
  //region Form Controls
  @Input('formControl') locationForm: FormControl;
  @Input('formControl') lineForm: FormControl;
  @Input('formControl') dateForm: FormControl;
  @Input('formControl') timeForm: FormControl;
  @Input('formControl') durationForm: FormControl;
  @Input('formControl') substanceForm: FormControl;
  @Input('formControl') bookedForm: FormControl;
  @Input('formControl') countForm: FormControl;
  @Input('formControl') endDateForm: FormControl;
  @Input('formControl') intervalForm: FormControl;
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

  timePeriod: TimePeriod[] = [
    {value: 'daily', viewValue: 'täglich'},
    {value: 'weekly', viewValue: 'wöchtenlich'},
    {value: 'monthly', viewValue: 'monatlich'}
  ];

  count: number[] = [
    1,2,3,4,5,6,7,8,9,10
  ];
  //endregion

  //region Variables for validation
  dateBeforeMin: boolean;
  timeBeforeMin: boolean;
  endDateBeforeStartDate: boolean;
  //endregion

  //region Auxiliary variables
  isBooked: any;
  minDate: Date;
  sliderLabel: string;
  sliderValue: boolean;

  locations: string[] = [
    "Braunau",
    "Linz Landstraße",
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

  constructor(public dialogRef: MatDialogRef<AppointmentCreatorComponent>, private uiService: UiService) {
    // Set min date of datepickers to current date
    this.minDate = new Date();

    // Initialize validation variables
    this.dateBeforeMin = false;
    this.timeBeforeMin = false;
    this.endDateBeforeStartDate = false;

    // Initialize slider values
    this.sliderValue = false;
    this.sliderLabel = 'Termin erstellen';

    // Initialize form controls
    this.locationForm = new FormControl();
    this.lineForm = new FormControl();
    this.dateForm = new FormControl();
    this.timeForm = new FormControl();
    this.durationForm = new FormControl();
    this.substanceForm = new FormControl();
    this.bookedForm = new FormControl();
    this.countForm = new FormControl();
    this.endDateForm = new FormControl();
    this.intervalForm = new FormControl();
  }

  //region Methods

  // Event handler for slider
  onSliderChanged($event: MatSlideToggleChange): void {
    this.sliderValue = $event.checked;

    if(this.sliderValue) {
      this.sliderLabel = 'Terminserie erstellen'
    } else {
      this.sliderLabel = 'Termin erstellen';
    }
  }

  // Event handler for time interval select
  onChangeSelect(event: any) {
    this.uiService.toggleForm(event.value);
  }

  // Event handler for creator popup
  onStore() {
    // Validate input
    this.endDateBeforeStartDate = false;
    this.timeBeforeMin = false;
    this.dateBeforeMin = false;

    let validInput: boolean = true;
    let intervalValue: string = '';

    // Check if location input is empty
    if(this.locationForm.value == null) {
      this.locationForm.markAsTouched();
      validInput = false;
    }

    // Check if line input is empty
    if(this.lineForm.value == null) {
      this.lineForm.markAsTouched();
      validInput = false;
    }

    // Check if date input is empty
    if(this.dateForm.value == null) {
      this.dateForm.markAsTouched();
      validInput = false;
    }

    // Get current date with time 00:00  to check if the date is below the min date (= in the past)
    let d: Date = new Date();
    d.setHours(0,0,0,0);

    if(this.dateForm.value < d) {
      this.dateBeforeMin = true;
      validInput = false;
    }

    // Check if time input is empty
    if(this.timeForm.value == null) {
      this.timeForm.markAsTouched();
      validInput = false;
    }

    // Check if duration input is empty
    if(this.durationForm.value == null) {
      this.durationForm.markAsTouched();
      validInput = false;
    }

    // Check if substance input is empty
    if(this.substanceForm.value == null) {
      this.substanceForm.markAsTouched();
      validInput = false;
    }

    // Check if the user wants to create an appointment series
    if(this.sliderValue) {
      // Check appointment series attributes

      // Check if count input is empty
      if(this.countForm.value == null) {
        this.countForm.markAsTouched();
        validInput = false;
      }

      // Check if interval input is empty
      if(this.intervalForm.value == null) {
        this.intervalForm.markAsTouched();
        validInput = false;
      }

      // Check if endDate input is empty
      if(this.endDateForm.value == null) {
        this.endDateForm.markAsTouched();
        validInput = false;
      }

      // Check if endDate is before startDate
      if(this.endDateForm.value < this.dateForm.value) {
        this.endDateBeforeStartDate = true;
        validInput = false;
      }

      // Check interval value
      if(false) {
        intervalValue = this.intervalForm.value;
      }
    }

    if(!validInput) {
      // Some input is not valid - show error messages
      console.log('invalid input')
      return;
    }

    // Check if date und time is in the future
    const [hours, minutes] = this.timeForm.value.split(':').map(Number);
    let inputDate: Date = this.dateForm.value;
    inputDate.setHours(hours, minutes);

    if(inputDate < new Date()) {
      this.timeBeforeMin = true;
      validInput = false;
    }

    if(!validInput) {
      // Some input is not valid - show error messages
      console.log('invalid input')
      return;
    }

    // Check if there is already an appointment on this location, line and time
    if(false) {
      alert('Es is bereits ein Termin an diesem Standort auf dieser Linie zur gewünschten Zeit vorhanden!');
      return;
    }

    // Check if the return value should be an appointment or appointment series
    if(this.sliderValue) {
      // Create appointment series object with the data
      let appointmentSeries: AppointmentSeries = {
        location: this.locationForm.value,
        line: this.lineForm.value,
        startDate: inputDate,
        duration: this.durationForm.value,
        substance: this.substanceForm.value,
        endDate: this.endDateForm.value,
        count: this.countForm.value,
        interval: intervalValue
      }
      // Close popup and return the data
      this.dialogRef.close(appointmentSeries);
    } else {
      // Create appointment object with the data
      let appointment: Appointment = {
        location: this.locationForm.value, line: this.lineForm.value, date: inputDate, duration: this.durationForm.value, substance: this.substanceForm.value, booked: this.bookedForm.value
      };
      // Close popup and return the data
      this.dialogRef.close(appointment);
    }
  }

  //endregion
}
