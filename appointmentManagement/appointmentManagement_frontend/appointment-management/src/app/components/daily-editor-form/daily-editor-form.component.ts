import {Component, EventEmitter, Output} from '@angular/core';
import {UiService} from "../../services/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-daily-editor-form',
  templateUrl: './daily-editor-form.component.html',
  styleUrls: ['./daily-editor-form.component.css']
})
export class DailyEditorFormComponent {
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
  }

  // Handler for the selection component
  onChange(event: any) {
    this.switchChanged.emit(event);
  }
}
