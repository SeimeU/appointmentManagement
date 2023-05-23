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

  months: number[] = [
    1,2,3,4,5,6
  ];

  period: string[] = [
    "ersten",
    "zweiten",
    "dritten",
    "vierten",
    "letzten"
  ];

  days: string[] = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag"
  ];

  constructor(private uiService:UiService) {
    this.subscription = this.uiService.onToggleMonthly().subscribe((value) => this.showMonthlyForm = value);
  }
}
