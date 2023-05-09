package dke.appointment_Management.controller;

import dke.appointment_Management.entity.Appointment;
import dke.appointment_Management.entity.AppointmentSeries;
import dke.appointment_Management.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService service;

    @PostMapping("/appointment")
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return service.createAppointment(appointment);
    }

    @PostMapping("/appointmentSeries")
    public AppointmentSeries createAppointmentSeries(@RequestBody AppointmentSeries appointmentSeries) {
        return service.createAppointmentSeries(appointmentSeries);
    }

    @PostMapping("/appointment/{appointment-id}")
    public Appointment saveAppointment(@RequestBody Appointment appointment) {
        return service.saveAppointment(appointment);
    }

    @PostMapping("/appointmentSeries/{appointment-id}")
    public AppointmentSeries saveAppointmentSeries(@RequestBody AppointmentSeries appointmentSeries) {
        return service.saveAppointmentSeries(appointmentSeries);
    }

    @DeleteMapping("/appointment/{appointment-id}")
    public void deleteAppointment(@RequestBody Appointment appointment) {
        service.deleteAppointment(appointment);
    }

    @DeleteMapping("/appointmentSeries/{appointment-id}")
    public void deleteAppointmentSeries(@RequestBody AppointmentSeries appointmentSeries) {
        service.deleteAppointmentSeries(appointmentSeries);
    }

    @GetMapping("/appointments")
    public List<Appointment> getAllAppointments() {
        return service.getAppointments();
    }

    @GetMapping("/appointmentSeries")
    public List<AppointmentSeries> getAllAppointmentSeries() {
        return service.getAppointmentSeries();
    }

    @GetMapping("/appointment/{appointment-id}")
    public Appointment getAppointmentById(@PathVariable int id) {
        return service.getAppointmentById(id);
    }

    @GetMapping("/appointmentSeries/{appointment-id}")
    public AppointmentSeries getAppointmentSeriesById(@PathVariable int id) {
        return service.getAppointmentSeriesById(id);
    }

    @GetMapping("/appointments/{date}/")
    public List<Appointment> getAppointmentsByDate(@RequestBody Date date) {
        return service.getAppointmentsByDate(date);
    }

    @GetMapping("/appointments/{loc-name}/")
    public List<Appointment> getAppointmentsByLocation(@RequestBody String[] locations) {
        return service.getAppointmentsByLocation(locations);
    }

    @GetMapping("/locations/{loc-name}/free-appointments")
    public List<Appointment> getFreeAppointmentsByLocation(@RequestBody String[] locations) {
        return service.getFreeAppointmentsByLocation(locations);
    }
}
