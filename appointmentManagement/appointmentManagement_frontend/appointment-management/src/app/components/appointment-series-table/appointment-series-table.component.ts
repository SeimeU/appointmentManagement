import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AppointmentService} from "../../services/appointment.service";
import {MatDialog} from "@angular/material/dialog";
import {AppointmentSeries} from "../../AppointmentSeries";
import {AppointmentSeriesEditorComponent} from "../appointment-series-editor/appointment-series-editor.component";

@Component({
  selector: 'app-appointment-series-table',
  templateUrl: './appointment-series-table.component.html',
  styleUrls: ['./appointment-series-table.component.css']
})
export class AppointmentSeriesTableComponent {
  //region Fields
  // Hard-coded table columns array
  displayColumns: string[] = ['id', 'startDate', 'endDate', 'timeInterval', 'cnt', 'location', 'line', 'duration', 'substance']

  // Data stores for the table
  dataSource: MatTableDataSource<AppointmentSeries>;
  appointmentSeries: AppointmentSeries[] = [];

  // Table variables for the paginator and the sort function
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;
  //endregion

  constructor(private appointmentService: AppointmentService, public dialog: MatDialog) {
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
      data: {location: row.location, line: row.line, substance: row.substance, duration: row.duration, startDate: row.startDate, endDate: row.endDate, count: row.cnt, interval: row.interval }
    });

    // Check if the dialog was closed with the store button
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // Send the http request to create the appointment (series)
      if(result !== null) {
        this.appointmentService.saveAppointmentSeries(result).subscribe(s => console.log(s));
      }
    });
  }
}
