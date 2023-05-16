import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../../Appointment";

@Component({
  selector: 'app-appointment-creator',
  templateUrl: './appointment-creator.component.html',
  styleUrls: ['./appointment-creator.component.css']
})
export class AppointmentCreatorComponent {
  isBooked: any;
  constructor(public dialogRef: MatDialogRef<AppointmentCreatorComponent>, @Inject(MAT_DIALOG_DATA) public data: Appointment) {
  }

  ngOnInit(): void {
  }

  changeSelect() {
    const selectElement = document.getElementById('zeitraum') as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex].value;

    if(selectedOption == "daily"){
      console.log('jaa');
    }

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
