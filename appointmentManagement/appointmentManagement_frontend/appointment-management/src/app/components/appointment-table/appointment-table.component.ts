import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Appointment} from "../../Appointment";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {AppointmentService} from "../../services/appointment.service";
import {AppointmentEditorComponent} from "../appointment-editor/appointment-editor.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<Appointment>;
  appointments: Appointment[] = [];
  displayColumns: string[] = ['id', 'date' , 'location', 'line', 'duration', 'booked', 'substance']

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;

  constructor(private appointmentService: AppointmentService, public dialog: MatDialog) {
    this.appointmentService.getAppointments().subscribe((appointments) => {
      this.appointments = appointments;
      this.dataSource = new MatTableDataSource<Appointment>(this.appointments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.dataSource = new MatTableDataSource<Appointment>(this.appointments);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClick(row: Appointment) {
    const dialogRef = this.dialog.open(AppointmentEditorComponent, {
      data: {location: row.location, line: row.line, booked: row.booked, substance: row.substance, date: row.date, duration: row.duration}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result !== null) {

      }
    });
  }
}
