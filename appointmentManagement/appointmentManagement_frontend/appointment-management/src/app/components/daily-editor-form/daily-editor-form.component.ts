import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UiService} from "../../services/ui.service";
import {Subscription} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-daily-editor-form',
  templateUrl: './daily-editor-form.component.html',
  styleUrls: ['./daily-editor-form.component.css']
})
export class DailyEditorFormComponent implements OnChanges{
  @Input() selectedDay: number | undefined;
  @Input('formControl') dayForm: FormControl;
  @Output() switchChanged = new EventEmitter();

  // Variables to toggle the forms visbility
  showDailyForm: boolean = false;
  subscription: Subscription;

  //region Hard-coded variables for ui
  days: number[] = [
    1,2,3,4,5,6
  ]
  //endregion

  constructor(private uiService:UiService) {
    this.subscription = this.uiService.onToggleDaily().subscribe((value) => this.showDailyForm = value);

    this.dayForm = new FormControl();
  }

  // Handler for the selection component
  onChange(event: any) {
    this.switchChanged.emit(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedDay'] != undefined && changes['selectedDay'].currentValue != undefined) {
      this.dayForm.setValue(changes['selectedDay'].currentValue);
    }
  }
}
