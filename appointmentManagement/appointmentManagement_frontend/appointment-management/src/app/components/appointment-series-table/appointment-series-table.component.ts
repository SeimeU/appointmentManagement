import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AppointmentService} from "../../services/appointment.service";
import {MatDialog} from "@angular/material/dialog";
import {AppointmentSeries} from "../../AppointmentSeries";
import {AppointmentSeriesEditorComponent} from "../appointment-series-editor/appointment-series-editor.component";
import {LocationAndMedicineService} from "../../services/location-and-medicine.service";
import {Appointment} from "../../Appointment";

@Component({
  selector: 'app-appointment-series-table',
  templateUrl: './appointment-series-table.component.html',
  styleUrls: ['./appointment-series-table.component.css']
})
export class AppointmentSeriesTableComponent {
  //region Fields
  // Hard-coded table columns array
  displayColumns: string[] = ['id', 'startDate', 'endDate', 'periodInterval', 'number', 'location', 'line', 'duration', 'substance']

  // Data stores for the table
  dataSource: MatTableDataSource<AppointmentSeries>;
  appointmentSeries: AppointmentSeries[] = [];

  // Table variables for the paginator and the sort function
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;
  //endregion

  constructor(private appointmentService: AppointmentService,private locationService: LocationAndMedicineService, public dialog: MatDialog) {
    this.appointmentService.getAppointmentSeries().subscribe((appointmentSeries) => {
      this.appointmentSeries = appointmentSeries;
      this.dataSource = new MatTableDataSource<AppointmentSeries>(this.appointmentSeries);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.dataSource = new MatTableDataSource<AppointmentSeries>(this.appointmentSeries);
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
  onRowClick(row: AppointmentSeries) {
    // Create a dialog with the data of the clicked appointment
    const dialogRef = this.dialog.open(AppointmentSeriesEditorComponent, {
      data: {id: row.id, location: row.location, line: row.line, substance: row.substance, duration: row.duration, startDate: row.startDate, endDate: row.endDate, number: row.number, periodInterval: row.periodInterval, appointments: row.appointments }
    });

    // Check if the dialog was closed with the store button
    dialogRef.afterClosed().subscribe(result => {
      // Send the http request to create the appointment (series)
      if(result !== null) {
        // Check if the appointment series should be deleted
        if(result.deleted != undefined) {
          this.appointmentService.deleteAppointmentSeries(result);

          // Set the delete flag for all appointments in the appointment series in the other applications
          for(let i = 0; i<result.appointments.length; i++){
            let appointment: Appointment = result.appointments[i];
            // @ts-ignore - ignore error because id is in this case never undefined
            let id: number = appointment.id;
            //this.locationService.setAppointmentDeleted(id, appointment.location, appointment.line, appointment.substance);
          }

          // Filter out the old appointment object
          this.appointmentSeries = this.appointmentSeries.filter(a => a.id != result.id);
          // Sort the array ascending based on their id
          this.appointmentSeries = this.appointmentSeries.sort((a,b) => this.compare(a, b));

          // Update the table
          this.dataSource = new MatTableDataSource<AppointmentSeries>(this.appointmentSeries);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this.appointmentService.saveAppointmentSeries(result).subscribe(s => {
            this.appointmentSeries = this.appointmentSeries.filter(a => a.id != result.id);

            if(result.location == row.location) {
              this.appointmentSeries.push(s);
            }

            // Sort the array ascending based on their id
            this.appointmentSeries = this.appointmentSeries.sort((a,b) => this.compare(a, b));

            // Need this to update the table object - can not be outside (therefore duplicate like in the delete)
            this.dataSource = new MatTableDataSource<AppointmentSeries>(this.appointmentSeries);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });

        }
      }
    });
  }

  // Function to compare two appointment objects
  compare(a: AppointmentSeries, b: AppointmentSeries) {
    // @ts-ignore - to ignore that they can be undefined
    return a.id - b.id;
  }
}
