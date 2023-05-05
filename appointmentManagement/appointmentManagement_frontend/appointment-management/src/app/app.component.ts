import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AppointmentEditorComponent} from "./components/appointment-editor/appointment-editor.component";
import {Appointment} from "./Appointment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'Appointment management';
  public getScreenWidth: number = 0;
  public getScreenHeight: number = 0;

  constructor(public dialog: MatDialog) {
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
    const dialogRef = this.dialog.open(AppointmentEditorComponent, {
      data: {location: "", line: "", booked: false, substance: "", date: "", duration: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
