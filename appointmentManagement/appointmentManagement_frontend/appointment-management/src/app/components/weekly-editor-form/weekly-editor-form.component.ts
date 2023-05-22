import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-weekly-editor-form',
  templateUrl: './weekly-editor-form.component.html',
  styleUrls: ['./weekly-editor-form.component.css']
})
export class WeeklyEditorFormComponent {
  showWeeklyForm: boolean = false;
  subscription: Subscription;

  constructor(private uiService:UiService) {
    this.subscription = this.uiService.onToggleWeekly().subscribe((value) => this.showWeeklyForm = value);
  }
}
