import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../services/appointment.service";
import {Chart} from 'chart.js/auto'

@Component({
  selector: 'app-mayor-dashboard',
  templateUrl: './mayor-dashboard.component.html',
  styleUrls: ['./mayor-dashboard.component.css']
})
export class MayorDashboardComponent implements OnInit{
  //region Fields
  public chart: any;

  freeAppointments: number = 0;
  bookedAppointments: number = 0;
  allAppointments: number = 0;
  percentage: number = 0;
  //endregion

  constructor(private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
    // Make the http-request to get the number of free appointments
    this.appointmentService.getNumberOfFreeAppointments().subscribe((num) => {
      this.freeAppointments = num;

      // Make the http-request to get the number of overall appointments
      this.appointmentService.getNumberOfAppointments().subscribe((num) => {
        this.allAppointments = num;

        // Calculate the number of booked appointments
        this.bookedAppointments = this.allAppointments - this.freeAppointments;

        // Calculate the percentage of how much appointments are booked - check to not divide through 0
        if (this.allAppointments != 0) {
          this.percentage = (this.bookedAppointments / this.allAppointments) * 100;
        }

        // Create a piechart with the data
        this.chart = new Chart("PieChart", {
          type: 'doughnut',  // type of the chart
          data: {
            labels: ['Freie Termine', 'Gebuchte Termine'],
            datasets: [
              {
                label: 'Termine',
                data: [this.freeAppointments, this.bookedAppointments],
                backgroundColor: ['rgba(53,250,0,0.84)', 'rgba(245,0,0,0.77)'],
                hoverOffset: 4
              }
            ]
          },
          options: {
            aspectRatio: 2.5
          }
        });
      });
    });
  }
}
