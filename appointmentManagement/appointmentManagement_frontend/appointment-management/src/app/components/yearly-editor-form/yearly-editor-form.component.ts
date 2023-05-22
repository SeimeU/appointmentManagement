import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-yearly-editor-form',
  templateUrl: './yearly-editor-form.component.html',
  styleUrls: ['./yearly-editor-form.component.css']
})
export class YearlyEditorFormComponent {
  showYearlyForm: boolean = false;
  subscription: Subscription;

  constructor(private uiService:UiService) {
    this.subscription = this.uiService.onToggleYearly().subscribe((value) => this.showYearlyForm = value);
  }
}
