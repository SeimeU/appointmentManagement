import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AppointmentCreatorComponent} from "./components/appointment-creator/appointment-creator.component";
import {AppointmentService} from "./services/appointment.service";
import {DISTRICTS} from "./districts";
import {MatSelectChange} from "@angular/material/select";
import {FormControl} from "@angular/forms";
import {Result} from "./Result";

// Constants for the users
const BGM: string = "Bürgermeister";
const GEM: string = "Gemeindemitarbeiter";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  //region Fields
  @Input('formControl') selectedOption: FormControl;

  // Hard-coded selection arrays
  districts: string[];

  user: string[] = [
    BGM,
    GEM
  ];

  // Toolbar title
  title: string = 'Terminverwaltung';

  // Auxiliary variables
  gemSelected: boolean = false;
  bgmSelected: boolean = false;
  districtSelected: boolean = false;
  us: string = "";
  //endregion

  constructor(public dialog: MatDialog, private appointmentService: AppointmentService) {
    this.districts = DISTRICTS;
    this.selectedOption = new FormControl('None');
  }

  //region Methods

  // Event handler for the add appointment (series) button
  onAddAppointmentClick(): void {
    // Create the appointment creator component as a dialog
    const dialogRef = this.dialog.open(AppointmentCreatorComponent, {
      disableClose: true
    });

    // Send the http request
    dialogRef.afterClosed().subscribe(result => {
      // Check if the dialog was closed with the store button
      if(result !== null) {
        let res: Result = result;

        // Send the http request to create the appointment (series)
        if (res.appointment) {
          this.appointmentService.saveAppointment(res.appointment).subscribe(s => console.log(s));
        } else if (res.appointmentSeries) {
          this.appointmentService.saveAppointmentSeries(res.appointmentSeries).subscribe(s => console.log(s));
        }
      }
    });
  }

  // Event handler for the user selector
  onUserChanged($event: MatSelectChange) {
    // Set the selected user
    if($event.value == BGM) {
      this.gemSelected = false;
      this.bgmSelected = true;
      this.us = BGM;
    } else if($event.value == GEM) {
      this.bgmSelected = false;
      this.gemSelected = true;
      this.us = GEM;
    }
  }

  // Event handler for the district selector
  onDistrictChanged($event: MatSelectChange) {
    if($event.value == undefined) {
      this.districtSelected = false;
    } else {
      if(this.districtSelected) {
        // If the district was already selected - set the selection of the user to 'None' - so that the screen gets cleared
        this.selectedOption.setValue('None');
        this.gemSelected = false;
        this.bgmSelected = false;
      }

      // Set the selected district
      this.districtSelected = true;
      this.appointmentService.district = $event.value;
    }
  }
  //endregion
}
