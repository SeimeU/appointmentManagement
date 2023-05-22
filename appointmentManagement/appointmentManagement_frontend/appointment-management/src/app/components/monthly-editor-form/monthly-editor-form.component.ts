import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-monthly-editor-form',
  templateUrl: './monthly-editor-form.component.html',
  styleUrls: ['./monthly-editor-form.component.css']
})
export class MonthlyEditorFormComponent {
  showMonthlyForm: boolean = false;
  subscription: Subscription;

  constructor(private uiService:UiService) {
    this.subscription = this.uiService.onToggleMonthly().subscribe((value) => this.showMonthlyForm = value);
  }
}
