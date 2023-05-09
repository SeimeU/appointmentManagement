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

  onAbortClick() {
    this.dialogRef.close();
  }

  onDeleteClick() {
    console.log('Gelöscht');
  }

  changeSelect() {
    const selectElement = document.getElementById('zeitraum') as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex].value;

    if(selectedOption == "daily"){
      console.log('jaa');
    }

  }
  }




