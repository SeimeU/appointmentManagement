import { Component } from '@angular/core';
import {UiService} from "../../services/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-daily-editor-form',
  templateUrl: './daily-editor-form.component.html',
  styleUrls: ['./daily-editor-form.component.css']
})
export class DailyEditorFormComponent {
  showDailyForm: boolean = false;
  subscription: Subscription;

  days: number[] = [
    1,2,3,4,5,6
  ]

  constructor(private uiService:UiService) {
    this.subscription = this.uiService.onToggleDaily().subscribe((value) => this.showDailyForm = value);
  }
}
