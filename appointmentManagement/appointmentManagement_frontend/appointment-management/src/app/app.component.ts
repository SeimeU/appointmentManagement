import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Appointment} from "./Appointment";
import {AppointmentCreatorComponent} from "./components/appointment-creator/appointment-creator.component";
import {AppointmentService} from "./services/appointment.service";
import {DISTRICTS} from "./districts";
import {MatSelectChange} from "@angular/material/select";
import {FormControl} from "@angular/forms";


const BGM: string = "Bürgermeister";
const GEM: string = "Gemeindemitarbeiter";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title: string = 'Terminverwaltung';
  public getScreenWidth: number = 0;
  public getScreenHeight: number = 0;

  districts: string[];

  user: string[] = [
    BGM,
    GEM
  ];

  selectedOption: FormControl;
  gemSelected: boolean = false;
  bgmSelected: boolean = false;
  districtSelected: boolean = false;
  us: string = "";

  constructor(public dialog: MatDialog, private appointmentService: AppointmentService) {
    this.districts = DISTRICTS;
    this.selectedOption = new FormControl('None');
  }

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  onClick(): void {
    const dialogRef = this.dialog.open(AppointmentCreatorComponent, {
      disableClose: true,
      data: {location: "", line: "", booked: false, substance: "", date: "", duration: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result !== null) {
        this.appointmentService.createAppointment(result).subscribe(s => console.log(s));
      }
    });
  }

  onUserChanged($event: MatSelectChange) {
    this.gemSelected = false;
    this.bgmSelected = false;

    if($event.value == BGM) {
      this.bgmSelected = true;
      this.us = BGM;
    } else if($event.value == GEM) {
      this.gemSelected = true;
      this.us = GEM;
    }
  }

  onDistrictChanged($event: MatSelectChange) {
    if($event.value == undefined) {
      this.districtSelected = false;
    } else {
      this.districtSelected = true;
      this.appointmentService.district = $event.value;

      // Set the selection of the user to 'None' - so that the screen gets cleared
      this.selectedOption.setValue('None');
      this.gemSelected = false;
      this.bgmSelected = false;
    }
  }
}
