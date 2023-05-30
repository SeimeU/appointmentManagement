import {Component, EventEmitter, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-weekly-editor-form',
  templateUrl: './weekly-editor-form.component.html',
  styleUrls: ['./weekly-editor-form.component.css']
})
export class WeeklyEditorFormComponent {
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
  }

  // Handler for the selection component
  onSelectionChange(event: any) {
    this.numberSwitchChanged.emit(event);
  }

  // Handler for the checkbox components
  onDayCheckedChange(event: any) {
    this.dayCheckedChanged.emit(event);
  }
}
