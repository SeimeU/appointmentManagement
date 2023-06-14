import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UiService} from "../../services/ui.service";
import {AppointmentSeries} from "../../entities/AppointmentSeries";
import {AppointmentService} from "../../services/appointment.service";

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
export class AppointmentSeriesEditorComponent implements OnInit{
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
    {value: 20, viewValue: '20min'}
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
  minDate: Date;
  dailyRepeat: number;
  weeklyRepeat: number;
  weeklyDaysRepeat: number[];
  monthlyRepeat: number;
  monthlyNumberRepeat: number;
  monthlyDayRepeat: number;
  selectedDay!: number;
  selectedWeek!: number;
  selectedDays!: string;
  selectedMonth!: number;
  selectedMonthlyNumber!: number;
  selectedMonthlyDay!: number;


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

  constructor(public dialogRef: MatDialogRef<AppointmentSeriesEditorComponent>, private uiService: UiService, private appointmentService: AppointmentService, @Inject(MAT_DIALOG_DATA) public data: AppointmentSeries) {
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

    // Get the interval value
    let period_interval: string = data.periodInterval.split(';')[0];

    // Initialize form controls
    this.locationForm = new FormControl(data.location);
    this.lineForm = new FormControl(data.line);
    this.dateForm = new FormControl(data.startDate);
    this.timeForm = new FormControl(time);
    this.durationForm = new FormControl(data.duration);
    this.substanceForm = new FormControl(data.substance);
    this.countForm = new FormControl(data.number);
    this.endDateForm = new FormControl(data.endDate);
    this.intervalForm = new FormControl(period_interval);
  }

  ngOnInit(): void {
    // Get the interval value and toggle the ui form
    let period_interval: string = this.data.periodInterval.split(';')[0];

    // Transfer the values to the right component
    if(period_interval == 'daily') {
      this.selectedDay = Number(this.data.periodInterval.split(';')[1]);
      this.dailyRepeat = this.selectedDay;
    } else if(period_interval == 'weekly') {
      this.selectedWeek = Number(this.data.periodInterval.split(';')[1]);
      this.weeklyRepeat = this.selectedWeek;
      this.selectedDays = this.data.periodInterval.split(';')[2];
      this.weeklyDaysRepeat = this.selectedDays.split(',').map(Number);
    } else if(period_interval == 'monthly') {
      this.selectedMonth = Number(this.data.periodInterval.split(';')[1]);
      this.monthlyRepeat = this.selectedMonth;
      this.selectedMonthlyNumber = Number(this.data.periodInterval.split(';')[2]);
      this.monthlyNumberRepeat = this.selectedMonthlyNumber;
      this.selectedMonthlyDay = Number(this.data.periodInterval.split(';')[3]);
      this.monthlyDayRepeat = this.selectedMonthlyDay;
    }

    this.uiService.toggleForm(period_interval);

    // Get the selection possibilities for the current selection
    //this.locService.getLocationsWithCapacity().subscribe(loc => this.locations = loc);
    //this.locService.getLinesOfLocation(this.data.location).subscribe(li => this.lines = li);
    //this.locService.getSubstancesOfLine(this.data.location, this.data.line).subscribe(sub => this.substances = sub);
  }

  // Event handler for location selection
  onLocationChanged(event: any) {
    // Reset the line and substance - adjust it to new location
    this.lineForm.setValue(null);
    this.substanceForm.setValue(null);

    //this.locService.getLinesOfLocation(event.value).subscribe(li => this.lines = li);
    //this.substances = [];
  }

  // Event handler for line selection
  onLineChanged(event: any) {
    if(event.value != null && this.locationForm.value != null) {
      this.substanceForm.setValue(null);
      //this.locService.getSubstancesOfLine(this.locationForm.value, event.value).subscribe(sub => this.substances = sub);
    }
  }

  // Event handler for delete click
  onDeleteClick() {
    let appointmentSeries: AppointmentSeries = {
      id: this.data.id,
      location: this.data.location,
      line: this.data.line,
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      duration: this.data.duration,
      substance: this.data.substance,
      number: this.data.number,
      periodInterval: this.data.periodInterval,
      appointments: this.data.appointments,
      deleted: true
    }
    this.dialogRef.close(appointmentSeries);
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
      id: this.data.id,
      location: this.locationForm.value,
      line: this.lineForm.value,
      startDate: inputDate,
      duration: this.durationForm.value,
      substance: this.substanceForm.value,
      endDate: this.endDateForm.value,
      number: this.countForm.value,
      periodInterval: intervalValue,
      appointments: this.data.appointments
    }

    this.appointmentService.checkAppointmentsSeriesPossible(appointmentSeries).subscribe(valid => {
      // Check if there is already an appointment on this location, line and time
      if(!valid) {
        alert('Es is bereits ein Termin an diesem Standort auf dieser Linie zur gewünschten Zeit vorhanden!');
        return;
      }

      // Close popup and return the data
      this.dialogRef.close(appointmentSeries);
    });
  }

  //endregion
}
