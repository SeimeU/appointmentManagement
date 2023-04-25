package dke.contact_tracing.service;

import dke.contact_tracing.entity.Person;
import dke.contact_tracing.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    @Autowired
    private PersonRepository repository;

    public Person savePerson(Person person) {
        return repository.save(person);
    }

    public List<Person> getPersons() {
        return repository.findAll();
    }

    public Person getPersonBySvnr(int svnr) {
        return repository.findById(svnr).orElse(null);
    }

    public List<Person> getPersonsBySvnr(Integer[] svnrs) {
        return repository.findAllBySvnr(svnrs);
    }

    public String deletePerson(int id) {
        repository.deleteById(id);
        return "Person deleted" + id;
    }

 }
