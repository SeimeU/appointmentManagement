import {Appointment} from "./Appointment";
import {AppointmentSeries} from "./AppointmentSeries";

export interface Result {
  appointment?: Appointment;
  appointmentSeries?: AppointmentSeries;
}
