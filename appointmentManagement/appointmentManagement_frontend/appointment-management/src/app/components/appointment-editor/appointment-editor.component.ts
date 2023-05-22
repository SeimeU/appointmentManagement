import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../../Appointment";

@Component({
  selector: 'app-appointment-editor',
  templateUrl: './appointment-editor.component.html',
  styleUrls: ['./appointment-editor.component.css']
})
export class AppointmentEditorComponent implements OnInit{
  isBooked: any;
  constructor(public dialogRef: MatDialogRef<AppointmentEditorComponent>, @Inject(MAT_DIALOG_DATA) public data: Appointment) {
  }

  ngOnInit(): void {
  }

  onDeleteClick() {
    console.log('Gelöscht');
    this.dialogRef.close(null);
  }

  changeSelect() {
    const selectElement = document.getElementById('zeitraum') as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex].value;

    console.log(selectElement);

    if(selectedOption == "daily"){
      console.log('jaa');
    }

  }
}




