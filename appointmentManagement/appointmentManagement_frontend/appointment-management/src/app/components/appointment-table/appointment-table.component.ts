import {Component, ViewChild} from '@angular/core';
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
export class AppointmentTableComponent{
  //region Fields

  // Hard-coded table columns array
  displayColumns: string[] = ['id', 'date' , 'location', 'line', 'duration', 'booked', 'substance']

  // Data stores for the table
  dataSource: MatTableDataSource<Appointment>;
  appointments: Appointment[] = [];

  // Table variables for the paginator and the sort function
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;
  //endregion


  constructor(private appointmentService: AppointmentService, public dialog: MatDialog) {
    this.appointmentService.getAppointments().subscribe((appointments) => {
      this.appointments = appointments;
      this.dataSource = new MatTableDataSource<Appointment>(this.appointments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.dataSource = new MatTableDataSource<Appointment>(this.appointments);
  }

  // Event handler for the filter function of the table
  applyFilter(event: KeyboardEvent) {
    // Filter the data according to the input
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Check if the paginator exists
    if (this.dataSource.paginator) {
      // Jump back to the first page
      this.dataSource.paginator.firstPage();
    }
  }

  // Event handler for a click on a row of the table
  onRowClick(row: Appointment) {
    // Create a dialog with the data of the clicked appointment
    const dialogRef = this.dialog.open(AppointmentEditorComponent, {
      data: {id: row.id, location: row.location, line: row.line, booked: row.booked, substance: row.substance, date: row.date, duration: row.duration}
    });

    // Check if the dialog was closed with the store button
    dialogRef.afterClosed().subscribe(result => {
      // Send the http request to update the appointment
      if(result !== null) {
        this.appointmentService.updateAppointment(result).subscribe(s => this.dataSource._filterData(this.appointments.filter(a => a.id != result.id)));
      }
    });
  }
}
