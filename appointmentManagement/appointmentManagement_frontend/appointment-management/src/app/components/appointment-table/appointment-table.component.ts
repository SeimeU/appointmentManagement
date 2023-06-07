import {Component, ViewChild} from '@angular/core';
import {Appointment} from "../../Appointment";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {AppointmentService} from "../../services/appointment.service";
import {AppointmentEditorComponent} from "../appointment-editor/appointment-editor.component";
import {MatDialog} from "@angular/material/dialog";
import {LocationAndMedicineService} from "../../services/location-and-medicine.service";

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


  constructor(private appointmentService: AppointmentService, private locationService: LocationAndMedicineService, public dialog: MatDialog) {
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
      // Send the http request to update or delete the appointment
      if(result !== null) {
        // Check if the appointment should be deleted
        if(result.deleted != undefined) {
          this.appointmentService.deleteAppointment(result);

          // Set the delete flag for the appointment in the other applications
          this.locationService.setAppointmentDeleted(result.id, result.location, result.line, result.substance);

          // Filter out the old appointment object
          this.appointments = this.appointments.filter(a => a.id != result.id);
          // Sort the array ascending based on their id
          this.appointments = this.appointments.sort((a,b) => this.compare(a, b));

          // Update the table
          this.dataSource = new MatTableDataSource<Appointment>(this.appointments);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this.appointmentService.saveAppointment(result).subscribe(s => {
            // Filter out the old appointment object and add the new one
            this.appointments = this.appointments.filter(a => a.id != result.id);

            if(result.location == row.location) {
              this.appointments.push(s);
            }

            // Sort the array ascending based on their id
            this.appointments = this.appointments.sort((a,b) => this.compare(a, b));

            // Need this to update the table object - can not be outside (therefore duplicate like in the delete)
            this.dataSource = new MatTableDataSource<Appointment>(this.appointments);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
        }
      }
    });
  }

  // Function to compare two appointment objects
  compare(a: Appointment, b: Appointment) {
    // @ts-ignore - to ignore that they can be undefined
    return a.id - b.id;
  }
}
