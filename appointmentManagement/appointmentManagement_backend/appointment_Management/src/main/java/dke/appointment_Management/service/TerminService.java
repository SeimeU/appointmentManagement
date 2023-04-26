package dke.contact_tracing.service;

import dke.contact_tracing.entity.Termin;
import dke.contact_tracing.repository.TerminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TerminService {

    @Autowired
    private TerminRepository repository;

    public Termin savePerson(Termin termin) {
        return repository.save(termin);
    }

    public List<Termin> getTermine() {
        return repository.findAll();
    }

    public Termin getTerminById(int id) {
        return repository.findById(id).orElse(null);
    }

    public List<Termin> getTerminsByLocation(String[] locations) {
        return repository.findAllByLocation(locations);
    }

    public List<Termin> getFreeTerminsByLocation(String[] locations) {
        return repository.findFreeByLocation(locations);
    }

    public String deletePerson(int id) {
        repository.deleteById(id);
        return "Person deleted" + id;
    }

 }
