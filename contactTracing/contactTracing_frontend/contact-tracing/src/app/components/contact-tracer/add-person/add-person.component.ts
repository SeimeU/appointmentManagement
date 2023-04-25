import {Component} from '@angular/core';
import {PersonService} from "../../../services/person.service";
import {Person} from "../../../entities/Person";

const emptyPerson: Person = {
  svnr: 0,
  firstName: '',
  lastName: '',
  birthday: new Date(),
  phoneNumber: '',
  sickInformation: {
    quarantine: false,
    symptoms: false,
    sick: false
  },
  address: {
    country: '',
    county: '',
    doorNumber: '',
    state: '',
    streetName: ''
  },
  contacts: [],
  email: '',
}

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {

  public person: Person = emptyPerson;

  constructor(private personService: PersonService) {
  }

  savePerson() {
    this.personService.addPerson(this.person).subscribe((newPerson) => {
      console.log('newPerson', newPerson);
    });
  }

}
