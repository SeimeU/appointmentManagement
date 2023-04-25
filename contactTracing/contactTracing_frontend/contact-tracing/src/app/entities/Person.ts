import {SickInformation} from "./SickInformation";
import {Address} from "./Address";

export type Person = {
  svnr: number;
  firstName: string;
  lastName: string;
  address: Address;
  birthday: Date;
  email: string;
  phoneNumber: string;
  sickInformation: SickInformation;
  contacts: string[];
}
