package dke.contact_tracing.controller;

import dke.contact_tracing.entity.Person;
import dke.contact_tracing.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PersonController {

    @Autowired
    private PersonService service;

    @PostMapping("/person")
    public Person addPerson(@RequestBody Person person) {
        return service.savePerson(person);
    }

    @GetMapping("/person")
    public List<Person> findAllPerson() {
        return service.getPersons();
    }

    @GetMapping("/person/{svnr}")
    public Person findPersonBySvnr(@PathVariable int svnr) {
        return service.getPersonBySvnr(svnr);
    }

    @GetMapping("/persons/")
    public List<Person> findPersonsBySvnr(@RequestBody Integer[] svnrs) {
        return service.getPersonsBySvnr(svnrs);
    }

    @GetMapping("/person/contacts/{svnr}")
    public List<String> findContactsFromPerson(@PathVariable int svnr) {
        return service.getPersonBySvnr(svnr).getContacts();
    }

}
