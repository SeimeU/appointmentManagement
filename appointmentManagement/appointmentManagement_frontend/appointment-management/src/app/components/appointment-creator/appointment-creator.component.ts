import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../../Appointment";
import {UiService} from "../../services/ui.service"; [UiService]

@Component({
  selector: 'app-appointment-creator',
  templateUrl: './appointment-creator.component.html',
  styleUrls: ['./appointment-creator.component.css']
})
export class AppointmentCreatorComponent {
  isBooked: any;
  minDate: Date;
  constructor(public dialogRef: MatDialogRef<AppointmentCreatorComponent>, private uiService: UiService, @Inject(MAT_DIALOG_DATA) public data: Appointment) {
    this.minDate = new Date()
  }

  ngOnInit(): void {
  }

  onChangeSelect(event: any) {
    this.uiService.toggleForm(event.value);
  }

  onStore(data: Appointment) {
    // check if date is not initialized - did not work with checking if null
    let dateNotInitialized: boolean = false;
    try {
      data.date.getDate()
    } catch (exception) {
      dateNotInitialized = true;
    }
    console.log(dateNotInitialized)

    if(data.duration == '' || dateNotInitialized || data.line == 0 || data.substance == '' || data.location == '') {
      this.dialogRef.close(null);
      return;
    }

    if(data.date.getDate() < Date.now()) {
      alert("Test");
    }

    this.dialogRef.close(data);
  }
}
