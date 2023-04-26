import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../entities/Person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly baseurl = 'http://localhost:9191/';

  constructor(private http: HttpClient) {
  }

  public getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseurl + 'person');
  }

  public addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseurl + 'person', person);
  }

}
