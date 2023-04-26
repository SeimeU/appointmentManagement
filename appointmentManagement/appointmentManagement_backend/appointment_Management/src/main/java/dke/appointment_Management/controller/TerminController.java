package dke.contact_tracing.controller;

import dke.contact_tracing.entity.Termin;
import dke.contact_tracing.service.TerminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TerminController {

    @Autowired
    private TerminService service;

    @PostMapping("/appointment/{appointment-id}")
    public Termin addPerson(@RequestBody Termin termin) {
        return service.saveTermin(termin);
    }

    @DeleteMapping("/appointment/{appointment-id}")
    public String deletePerson(@RequestBody Termin termin) {
        return service.deleteTermin(termin);
    }

    @GetMapping("/appointments")
    public List<Termin> findAllTermin() {
        return service.getTermine();
    }

    @GetMapping("/appointment/{appointment-id}")
    public Termin findTerminById(@PathVariable int id) {
        return service.getTerminById(id);
    }

    @GetMapping("/appointments/{loc-name}/")
    public List<Termin> findTerminsByLocation(@RequestBody String[] locations) {
        return service.getTerminsByLocation(locations);
    }

    @GetMapping("/locations/{loc-name}/free-appointments")
    public List<Termin> findFreeTerminsByLocation(@RequestBody String[] locations) {
        return service.getFreeTerminsByLocation(locations);
    }

}
