import {Appointment} from "./Appointment";
import {Duration} from "@fullcalendar/core";

export interface AppointmentSeries{
  id?: number;
  startDate: Date;
  endDate: Date;
  periodInterval: string;
  number: number;
  duration: Duration;
  location: string;
  line: number;
  substance: string;
  deleted?: boolean;
  appointments?: Appointment[];
}
