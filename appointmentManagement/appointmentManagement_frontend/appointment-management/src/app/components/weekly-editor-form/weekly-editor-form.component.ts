import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {UiService} from "../../services/ui.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-weekly-editor-form',
  templateUrl: './weekly-editor-form.component.html',
  styleUrls: ['./weekly-editor-form.component.css']
})
export class WeeklyEditorFormComponent implements OnChanges{
  @Input() selectedWeek: number | undefined;
  @Input() selectedDays: string | undefined;
  @Input('formControl') weekForm: FormControl;
  @Input('formControl') mondayForm: FormControl;
  @Input('formControl') tuesdayForm: FormControl;
  @Input('formControl') wednesdayForm: FormControl;
  @Input('formControl') thursdayForm: FormControl;
  @Input('formControl') fridayForm: FormControl;
  @Input('formControl') saturdayForm: FormControl;
  @Input('formControl') sundayForm: FormControl;

  @Output() numberSwitchChanged = new EventEmitter();
  @Output() dayCheckedChanged = new EventEmitter();

  // Variables to toggle the forms visbility
  showWeeklyForm: boolean = false;
  subscription: Subscription;

  //region Hard-coded variables for ui
  weeks: number[] = [
    1,2,3,4,5
  ]
  MONDAY: number = 1;
  TUESDAY: number = 2;
  WEDNESDAY: number = 3;
  THURSDAY: number = 4;
  FRIDAY: number = 5;
  SATURDAY: number = 6;
  SUNDAY: number = 7;
  //endregion

  constructor(private uiService:UiService) {
    this.subscription = this.uiService.onToggleWeekly().subscribe((value) => this.showWeeklyForm = value);

    this.weekForm = new FormControl();
    this.mondayForm = new FormControl();
    this.tuesdayForm = new FormControl();
    this.wednesdayForm = new FormControl();
    this.thursdayForm = new FormControl();
    this.fridayForm = new FormControl();
    this.saturdayForm = new FormControl();
    this.sundayForm = new FormControl();
  }

  // Handler for the selection component
  onSelectionChange(event: any) {
    this.numberSwitchChanged.emit(event);
  }

  // Handler for the checkbox components
  onDayCheckedChange(event: any) {
    this.dayCheckedChanged.emit(event);
  }

  // Handler to react to changes - used in editor components
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedWeek'] != undefined && changes['selectedWeek'].currentValue != undefined) {
      this.weekForm.setValue(changes['selectedWeek'].currentValue);
    }

    if(changes['selectedDays'] != undefined && changes['selectedDays'].currentValue != undefined) {
      let days: string[] = changes['selectedDays'].currentValue.split(',');
      for (let i = 0; i < days.length; i++) {
        switch (Number(days[i])) {
          case this.MONDAY:
            this.mondayForm.setValue(true);
            break;
          case this.TUESDAY:
            this.tuesdayForm.setValue(true);
            break;
          case this.WEDNESDAY:
            this.wednesdayForm.setValue(true);
            break;
          case this.THURSDAY:
            this.thursdayForm.setValue(true);
            break;
          case this.FRIDAY:
            this.fridayForm.setValue(true);
            break;
          case this.SATURDAY:
            this.saturdayForm.setValue(true);
            break;
          case this.SUNDAY:
            this.sundayForm.setValue(true);
            break;
        }
      }
    }
  }
}
