export interface Appointment{
  id: number;
  date: Date;
  time: string;
  duration: string;
  location: string;
  line: number;
  booked: boolean;
  substance: string;
}
