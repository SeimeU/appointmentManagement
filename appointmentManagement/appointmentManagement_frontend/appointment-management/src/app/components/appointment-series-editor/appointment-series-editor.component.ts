import {Component, Inject, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UiService} from "../../services/ui.service";
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
  selector: 'app-appointment-series-editor',
  templateUrl: './appointment-series-editor.component.html',
  styleUrls: ['./appointment-series-editor.component.css']
})
export class AppointmentSeriesEditorComponent {
  //region Form Controls
  @Input('formControl') locationForm: FormControl;
  @Input('formControl') lineForm: FormControl;
  @Input('formControl') dateForm: FormControl;
  @Input('formControl') timeForm: FormControl;
  @Input('formControl') durationForm: FormControl;
  @Input('formControl') substanceForm: FormControl;
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
    {value: 'weekly', viewValue: 'wöchentlich'},
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
  dailyRepeat: number;
  weeklyRepeat: number;
  weeklyDaysRepeat: number[];
  monthlyRepeat: number;
  monthlyNumberRepeat: number;
  monthlyDayRepeat: number;

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

  constructor(public dialogRef: MatDialogRef<AppointmentSeriesEditorComponent>, private uiService: UiService, @Inject(MAT_DIALOG_DATA) public data: AppointmentSeries) {
    console.log(data);

    // Set min date of datepickers to current date
    this.minDate = new Date();

    // Initialize validation variables
    this.dateBeforeMin = false;
    this.timeBeforeMin = false;
    this.endDateBeforeStartDate = false;

    // Initialize repeat variables
    this.dailyRepeat = 0;
    this.weeklyRepeat = 0;
    this.weeklyDaysRepeat = [];
    this.monthlyRepeat = 0;
    this.monthlyNumberRepeat = 0;
    this.monthlyDayRepeat = 0;

    // Get time component from data - check if the hours or minutes is only one digit - then add a leading 0
    let date: Date = new Date(data.startDate);
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
    this.dateForm = new FormControl(data.startDate);
    this.timeForm = new FormControl(time);
    this.durationForm = new FormControl(data.duration);
    this.substanceForm = new FormControl(data.substance);
    this.countForm = new FormControl(data.cnt);
    this.endDateForm = new FormControl(data.endDate);
    this.intervalForm = new FormControl();
  }

  // Event handler for delete click
  onDeleteClick() {
    console.log('Gelöscht');
    this.dialogRef.close(null);
  }

  // Event handler for time interval select
  onChangeSelect(event: any) {
    this.uiService.toggleForm(event.value);

    // Reset set variables
    this.dailyRepeat = 0;
    this.weeklyRepeat = 0;
    this.weeklyDaysRepeat = [];
    this.monthlyRepeat = 0;
    this.monthlyNumberRepeat = 0;
    this.monthlyDayRepeat = 0;
  }

  // Event handler for the daily component
  onDailyChanged(event: any) {
    this.dailyRepeat = event.value;
  }

  // Event handler for the weekly components selector element
  onWeeklySelectorChanged(event: any) {
    this.weeklyRepeat = event.value;
  }

  // Event handler for the weekly components checkboxes
  onWeeklyCheckboxesChanged(event: any) {
    // Check if the checkbox got checked or unchecked
    if(event.checked) {
      // Push the aria label value into the array - e.g. for Monday the aria label is 1, 2 for Tuesday ...
      this.weeklyDaysRepeat.push(event.source.ariaLabel);
    } else {
      // Remove the aria label value from the array
      const index = this.weeklyDaysRepeat.indexOf(event.source.ariaLabel);
      if(index > -1) {
        this.weeklyDaysRepeat.splice(index, 1);
      }
    }
  }

  // Event handler for the monthly components number element
  onMonthlyRepeatSelectorChanged(event: any) {
    this.monthlyRepeat = event.value;
  }

  // Event handler for the monthly components period element
  onMonthlyNumberSelectorChanged(event: any) {
    this.monthlyNumberRepeat = event.value;
  }

  // Event handler for the monthly components weekday element
  onMonthlyWeekdaySelectorChanged(event: any) {
    this.monthlyDayRepeat = event.value;
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
      alert('Enddatum ist vor dem Startdatum!');
      return;
    }

    // Check interval value
    if(this.intervalForm.value == null) {
      this.intervalForm.markAsTouched();
      validInput = false;
    } else if(this.intervalForm.value == 'daily' && this.dailyRepeat != 0) {
      // Correct input for the daily form - create interval value string
      intervalValue = this.intervalForm.value + ";" + this.dailyRepeat;
    } else if(this.intervalForm.value == 'weekly' && (this.weeklyRepeat != 0 && this.weeklyDaysRepeat.length != 0)) {
      // Correct input for the weekly form - create interval value string
      intervalValue = this.intervalForm.value + ";" + this.weeklyRepeat + ";";
      this.weeklyDaysRepeat.forEach(value => {intervalValue = intervalValue + value + ","});
      // Remove the last comma of the string - to match the expected pattern
      intervalValue = intervalValue.slice(0, -1);
    } else if(this.intervalForm.value == 'monthly' && (this.monthlyRepeat != 0 && this.monthlyNumberRepeat != 0 && this.monthlyDayRepeat != 0)) {
      // Correct input for the monthly form - create interval value string
      intervalValue = this.intervalForm.value + ";" + this.monthlyRepeat + ";" + this.monthlyNumberRepeat + ";" + this.monthlyDayRepeat;
    } else {
      // Input is not correct - at least one field is empty
      validInput = false;
    }

    if(!validInput) {
      // Some input is not valid - show error messages
      alert('Es müssen alle Felder ausgefüllt werden!');
      return;
    }

    // Check if date und time is in the future
    const [hours, minutes]  = this.timeForm.value.split(':').map(Number);
    let inputDate: Date = new Date(this.dateForm.value);
    inputDate.setHours(hours, minutes);

    if(inputDate < new Date()) {
      this.timeBeforeMin = true;
      validInput = false;
    }

    if(!validInput) {
      // Some input is not valid - show error messages
      alert('Das Startdatum darf nicht in der Vergangenheit liegen!');
      return;
    }

    // Create appointment series object with the data
    let appointmentSeries: AppointmentSeries = {
      location: this.locationForm.value,
      line: this.lineForm.value,
      startDate: inputDate,
      duration: this.durationForm.value,
      substance: this.substanceForm.value,
      endDate: this.endDateForm.value,
      cnt: this.countForm.value,
      interval: intervalValue
    }

    // Check if there is already an appointment on this location, line and time
    if(false) {
      alert('Es is bereits ein Termin an diesem Standort auf dieser Linie zur gewünschten Zeit vorhanden!');
      return;
    }

    // Close popup and return the data
    this.dialogRef.close(appointmentSeries);
  }

  //endregion
}
