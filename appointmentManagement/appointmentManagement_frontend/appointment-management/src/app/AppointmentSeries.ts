import {Appointment} from "./Appointment";
import {Duration} from "@fullcalendar/core";

export interface AppointmentSeries{
  id?: number;
  startDate: Date;
  endDate: Date;
  interval: string;
  duration: Duration;
  location: string;
  line: number;
  substance: string;
  appointments: Appointment[];
}
