export interface Appointment{
  id?: number;
  date: Date;
  duration: string;
  location: string;
  line: number;
  booked: boolean;
  substance: string;
}
