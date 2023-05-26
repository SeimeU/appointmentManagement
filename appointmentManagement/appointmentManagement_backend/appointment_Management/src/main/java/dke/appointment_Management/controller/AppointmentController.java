package dke.appointment_Management.controller;

import dke.appointment_Management.entity.Appointment;
import dke.appointment_Management.entity.AppointmentSeries;
import dke.appointment_Management.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class AppointmentController {
    private static final String DATE_FORMAT = "yyyy-MM-dd";
    private static final DateFormat df = new SimpleDateFormat(DATE_FORMAT);

    @Autowired
    private AppointmentService service;

    @PostMapping("/appointment")
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        if(appointment == null)
            return ResponseEntity.badRequest().build();

        if(!service.isValid(appointment))
            return ResponseEntity.badRequest().build();

        return new ResponseEntity<>(service.saveAppointment(appointment), HttpStatus.CREATED);
    }

    @PostMapping("/appointment-series")
    public ResponseEntity<AppointmentSeries> createAppointmentSeries(@RequestBody AppointmentSeries appointmentSeries) {
        if(appointmentSeries == null)
            return ResponseEntity.badRequest().build();

        // Check the syntax of the interval string
        if(!service.checkIntervalSyntax(appointmentSeries.getInterval()))
            return ResponseEntity.badRequest().build();

        if(!service.isValid(appointmentSeries))
            return ResponseEntity.badRequest().build();

        return new ResponseEntity<>(service.saveAppointmentSeries(appointmentSeries), HttpStatus.CREATED);
    }

    @PostMapping("/save-appointment")
    public ResponseEntity<Appointment> saveAppointment(@RequestBody Appointment appointment) {
        if(appointment == null)
            return ResponseEntity.badRequest().build();

        if(!service.isAvailable(appointment.getId(), false))
            return ResponseEntity.notFound().build();


        return ResponseEntity.ok(service.saveAppointment(appointment));
    }

    @PostMapping("/save-appointment-series")
    public ResponseEntity<AppointmentSeries> saveAppointmentSeries(@RequestBody AppointmentSeries appointmentSeries) {
        if(appointmentSeries == null)
            return ResponseEntity.badRequest().build();

        // Check the syntax of the interval string
        if(!service.checkIntervalSyntax(appointmentSeries.getInterval()))
            return ResponseEntity.badRequest().build();

        if(!service.isAvailable(appointmentSeries.getId(), true))
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(service.saveAppointmentSeries(appointmentSeries));
    }

    @DeleteMapping("/appointment")
    public ResponseEntity deleteAppointment(final Long id) {
        if(id == null || id < 1)
            return ResponseEntity.badRequest().build();

        if(!service.isAvailable(id, false))
            return ResponseEntity.notFound().build();

        service.deleteAppointment(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/appointment-series")
    public ResponseEntity deleteAppointmentSeries(final Long id) {
        if(id == null || id < 1)
            return ResponseEntity.badRequest().build();

        if(!service.isAvailable(id, true))
            return ResponseEntity.notFound().build();

        service.deleteAppointmentSeries(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all-appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        if(service.isEmpty(false))
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(service.getAppointments());
    }

    @GetMapping("/all-appointment-series")
    public ResponseEntity<List<AppointmentSeries>> getAllAppointmentSeries() {
        if(service.isEmpty(true))
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(service.getAppointmentSeries());
    }

    @GetMapping("/appointment")
    public ResponseEntity<Appointment> getAppointmentById(final Long id) {
        if(id == null || id < 1)
            return ResponseEntity.badRequest().build();

        if(!service.isAvailable(id, false))
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(service.getAppointmentById(id));
    }

    @GetMapping("/appointment-series")
    public ResponseEntity<AppointmentSeries> getAppointmentSeriesById(final Long id) {
        if(id == null || id < 1)
            return ResponseEntity.badRequest().build();

        if(!service.isAvailable(id, true))
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(service.getAppointmentSeriesById(id));
    }

    @GetMapping("/appointments-date")
    public ResponseEntity<List<Appointment>> getAppointmentsByDate(String date) {
        if(date == null)
            return ResponseEntity.badRequest().build();

        try {
            Date d = df.parse(date);
            return ResponseEntity.ok(service.getAppointmentsByDate(d));
        } catch (ParseException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/appointments-loc")
    public ResponseEntity<List<Appointment>> getAppointmentsByLocation(String location) {
        if(location == null || location.equals(""))
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(service.getAppointmentsByLocation(location));
    }

    @GetMapping("/appointments-series-loc")
    public ResponseEntity<List<AppointmentSeries>> getAppointmentSeriesByLocation(String location) {
        if(location == null || location.equals(""))
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(service.getAppointmentSeriesByLocation(location));
    }


    @GetMapping("/number-of-appointments-loc")
    public ResponseEntity<Integer> getNumberofAppointmentsByLocation(String location) {
        if(location == null || location.equals(""))
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(service.getAppointmentsByLocation(location).size());
    }

    @GetMapping("/free-appointments-loc")
    public ResponseEntity<List<Appointment>> getFreeAppointmentsByLocation(String location) {
        if(location == null || location.equals(""))
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(service.getFreeAppointmentsByLocation(location));
    }

    @GetMapping("/number-of-free-appointments-loc")
    public ResponseEntity<Integer> getNumberOfFreeAppointmentsByLocation(String location) {
        if(location == null || location.equals(""))
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(service.getFreeAppointmentsByLocation(location).size());
    }

    @PostMapping("/is-appointment-valid")
    public ResponseEntity<Boolean> getIfAppointmentIsValid(Appointment appointment) {
        if(appointment == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(service.isValid(appointment));
    }

    @PostMapping("/is-appointment-series-valid")
    public ResponseEntity<Boolean> getIfAppointmentSeriesIsValid(AppointmentSeries appointmentSeries) {
        if(appointmentSeries == null)
            return ResponseEntity.badRequest().build();

        // Check the syntax of the interval string
        if(!service.checkIntervalSyntax(appointmentSeries.getInterval()))
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(service.isValid(appointmentSeries));
    }
}
