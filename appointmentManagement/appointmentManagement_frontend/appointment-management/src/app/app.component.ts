import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Appointment} from "./Appointment";
import {AppointmentCreatorComponent} from "./components/appointment-creator/appointment-creator.component";
import {AppointmentService} from "./services/appointment.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'Appointment management';
  public getScreenWidth: number = 0;
  public getScreenHeight: number = 0;

  constructor(public dialog: MatDialog, private appointmentService: AppointmentService) {
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
}
