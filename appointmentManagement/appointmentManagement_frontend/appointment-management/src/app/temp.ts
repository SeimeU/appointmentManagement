import {Appointment} from "./Appointment";

export const APPOINTMENTS: Appointment[] = [
  {id: 1, location: "Braunau", line: 4, booked: true, substance: "Pfizer", date: new Date(), duration: "5min"},
  {id: 2, location: "Linz", line: 10, booked: false, substance: "Pfizer", date: new Date(), duration: "3min"},
  {id: 3, location: "Ried", line: 3, booked: true, substance: "Medikament", date: new Date(2023, 2, 14), duration: "30min"}
]
