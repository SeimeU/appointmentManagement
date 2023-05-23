import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../services/appointment.service";

@Component({
  selector: 'app-mayor-dashboard',
  templateUrl: './mayor-dashboard.component.html',
  styleUrls: ['./mayor-dashboard.component.css']
})
export class MayorDashboardComponent implements OnInit{
  freeAppointments: number = 0;
  bookedAppointments: number = 0;
  allAppointments: number = 0;
  percentage: number = 0;

  constructor(private appointmentService: AppointmentService) {
    this.appointmentService.getNumberOfFreeAppointments().subscribe(num => this.freeAppointments = num);
    this.appointmentService.getNumberOfAppointments().subscribe(num => this.allAppointments = num);
    this.bookedAppointments = this.allAppointments - this.freeAppointments;

    if(this.allAppointments != 0) {
      this.percentage = this.bookedAppointments / this.allAppointments;
    }
  }

  ngOnInit(): void {
  }

}
