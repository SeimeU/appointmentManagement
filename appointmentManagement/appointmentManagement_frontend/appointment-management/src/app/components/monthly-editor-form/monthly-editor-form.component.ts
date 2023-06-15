import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {UiService} from "../../services/ui.service";
import {FormControl} from "@angular/forms";

interface Select {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-monthly-editor-form',
  templateUrl: './monthly-editor-form.component.html',
  styleUrls: ['./monthly-editor-form.component.css']
})
export class MonthlyEditorFormComponent implements OnChanges{
  @Input() selectedMonth: number | undefined;
  @Input() selectedMonthlyNumber: number | undefined;
  @Input() selectedMonthlyDay: number | undefined;
  @Input('formControl') monthForm: FormControl;
  @Input('formControl') periodForm: FormControl;
  @Input('formControl') dayForm: FormControl;
  @Output() numberSwitchChanged = new EventEmitter();
  @Output() periodSwitchChanged = new EventEmitter();
  @Output() daySwitchChanged = new EventEmitter();

  // Variables to toggle the forms visbility
  showMonthlyForm: boolean = false;
  subscription: Subscription;

  //region Hard-coded variables for ui
  months: number[] = [
    1,2,3,4,5,6
  ];

  period: Select[] = [
    {value: 1, viewValue: "ersten"},
    {value: 2, viewValue: "zweiten"},
    {value: 3, viewValue: "dritten"},
    {value: 4, viewValue: "vierten"},
    {value: -1, viewValue: "letzten"}
  ];

  days: Select[] = [
    {value: 1, viewValue: "Montag"},
    {value: 2, viewValue: "Dienstag"},
    {value: 3, viewValue: "Mittwoch"},
    {value: 4, viewValue: "Donnerstag"},
    {value: 5, viewValue: "Freitag"},
    {value: 6, viewValue: "Samstag"},
    {value: 7, viewValue: "Sonntag"}
  ];
  //endregion

  constructor(private uiService:UiService) {
    this.subscription = this.uiService.onToggleMonthly().subscribe((value) => this.showMonthlyForm = value);

    this.monthForm = new FormControl();
    this.periodForm = new FormControl();
    this.dayForm = new FormControl();
  }

  // Handler for the number selection component
  onNumberSwitchChange(event: any) {
    this.numberSwitchChanged.emit(event);
  }

  // Handler for the period selection component
  onPeriodSwitchChange(event: any) {
    this.periodSwitchChanged.emit(event);
  }

  // Handler for the day selection component
  onDaySwitchChange(event: any) {
    this.daySwitchChanged.emit(event);
  }

  // Handler to react to changes - used in editor components
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedMonth'] != undefined && changes['selectedMonth'].currentValue != undefined) {
      this.monthForm.setValue(changes['selectedMonth'].currentValue);
    }

    if(changes['selectedMonthlyNumber'] != undefined && changes['selectedMonthlyNumber'].currentValue != undefined) {
      this.periodForm.setValue(changes['selectedMonthlyNumber'].currentValue);
    }

    if(changes['selectedMonthlyDay'] != undefined && changes['selectedMonthlyDay'].currentValue != undefined) {
      this.dayForm.setValue(changes['selectedMonthlyDay'].currentValue);
    }
  }
}
