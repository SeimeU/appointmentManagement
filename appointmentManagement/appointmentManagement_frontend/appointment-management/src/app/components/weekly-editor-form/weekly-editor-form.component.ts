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
  weeks: number[] = [
    1,2,3,4,5
  ]

  monday: any = false;
  tuesday: any = false;
  wednesday: any = false;
  thursday: any = false;
  friday: any = false;
  saturday: any = false;
  sunday: any = false;

  constructor(private uiService:UiService) {
    this.subscription = this.uiService.onToggleWeekly().subscribe((value) => this.showWeeklyForm = value);
  }
}
