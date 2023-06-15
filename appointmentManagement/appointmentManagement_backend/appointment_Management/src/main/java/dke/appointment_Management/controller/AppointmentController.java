package dke.appointment_Management.controller;

import dke.appointment_Management.entity.Appointment;
import dke.appointment_Management.entity.AppointmentSeries;
import dke.appointment_Management.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class AppointmentController {
    // Auxiliary variables to convert the incoming string of the getAppointmentsByDate() function into a Date object
    private static final String DATE_FORMAT = "yyyy-MM-dd";
    private static final DateTimeFormatter df = DateTimeFormatter.ofPattern(DATE_FORMAT);

    @Autowired
    private AppointmentService service;

    //region /appointment

    /**
     * Function to get an appointment
     * @param id Specifies which appointment is required
     * @return
     *      - Returns "Bad request" if the id is null or < 1
     *      - Returns "Not found" if there is no appointment with this id
     *      - Returns "Ok" and the appointment if it is found
     */
    @GetMapping("/appointment")
    public ResponseEntity<Appointment> getAppointmentById(@RequestParam final Long id) {
        if(id == null || id < 1)
            return ResponseEntity.badRequest().build();

        if(!service.isPresent(id, false))
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(service.getAppointmentById(id));
    }

    /**
     * Function to create an appointment
     * @param appointment the appointment that needs to be created
     * @return
     *      - Returns "Bad request" if the appointment parameter is null or there is an overlap on the same location and line
     *      - Returns "Ok" + the appointment if the appointment is already present
     *      - Returns "Created" + the appointment if a new appointment gets created
     */
    @PostMapping("/appointment")
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        if(appointment == null)
            return ResponseEntity.badRequest().build();

        if(!service.isValid(appointment))
            return ResponseEntity.badRequest().build();

        if(service.isPresent(appointment.getId(), false))
            return ResponseEntity.ok(service.saveAppointment(appointment));

        return new ResponseEntity<>(service.saveAppointment(appointment), HttpStatus.CREATED);
    }

    /**
     * Function to set the status of an appointment to booked
     * @param id Specifies which appointment is required
     * @return
     *      - Returns "Bad request" if the id is null or < 1
     *      - Returns "Not found" if there is no appointment with this id
     *      - Returns "Ok" and the updated appointment if it is found
     */
    @PutMapping("/appointment/{id}")
    public ResponseEntity<Appointment> bookAppointment(@PathVariable final Long id) {
        if(id == null || id < 1)
            return ResponseEntity.badRequest().build();

        if(!service.isPresent(id, false))
            return ResponseEntity.notFound().build();

        Appointment appointment = service.getAppointmentById(id);
        appointment.setBooked(true);
        return ResponseEntity.ok(service.saveAppointment(appointment));
    }

    /**
     * Function to set the delete flag of the appointment
     * @param id Specifies which appointment should be deleted
     * @return
     *      - Returns "Bad request" if the id is null or < 1
     *      - Returns "Not found" if there is no appointment with this id in the database
     *      - Otherwise returns "Ok"
     */
    @DeleteMapping("/appointment")
    public ResponseEntity<Void> deleteAppointment(@RequestParam final Long id) {
        if(id == null || id < 1)
            return ResponseEntity.badRequest().build();

        // Check if the entered id belongs to an appointment in the database - if it is present it gets deleted
        if(!service.isPresent(id, false))
            return ResponseEntity.notFound().build();

        service.deleteAppointment(id);
        return ResponseEntity.ok().build();
    }

    //endregion

    //region /appointment-series

    /**
     * Function to get an appointment series
     * @param id Specifies which appointment series is required
     * @return
     *      - Returns "Bad request" if the id is null or < 1
     *      - Returns "Not found" if there is no appointment series with this id
     *      - Returns "Ok" and the appointment series if it is found
     */
    @GetMapping("/appointment-series")
    public ResponseEntity<AppointmentSeries> getAppointmentSeriesById(@RequestParam final Long id) {
        if(id == null || id < 1)
            return ResponseEntity.badRequest().build();

        if(!service.isPresent(id, true))
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(service.getAppointmentSeriesById(id));
    }

    /**
     * Function to create an appointment series
     * @param appointmentSeries the appointment series that needs to be created
     * @return
     *      - Returns "Bad request" if the appointment series parameter is null or the interval syntax is wrong or there is an overlap on the same location and line
     *      - Returns "Ok" + the appointment series if the appointment series is already present
     *      - Returns "Created" + the appointment series if a new appointment series gets created
     */
    @PostMapping("/appointment-series")
    public ResponseEntity<AppointmentSeries> createAppointmentSeries(@RequestBody AppointmentSeries appointmentSeries) {
        if(appointmentSeries == null)
            return ResponseEntity.badRequest().build();

        // Check the syntax of the interval string
        if(!service.checkIntervalSyntax(appointmentSeries.getPeriodInterval()))
            return ResponseEntity.badRequest().build();

        if(!service.isValid(appointmentSeries))
            return ResponseEntity.badRequest().build();

        if(service.isPresent(appointmentSeries.getId(), true))
            return ResponseEntity.ok(service.saveAppointmentSeries(appointmentSeries));

        return new ResponseEntity<>(service.saveAppointmentSeries(appointmentSeries), HttpStatus.CREATED);
    }


    /**
     * Function to set the delete flag of the appointment series
     * @param id Specifies which appointment series should be deleted
     * @return
     *      - Returns "Bad request" if the id is null or < 1
     *      - Returns "Not found" if there is no appointment series with this id in the database
     *      - Otherwise returns "Ok"
     */
    @DeleteMapping("/appointment-series")
    public ResponseEntity<Void> deleteAppointmentSeries(@RequestParam final Long id) {
        if(id == null || id < 1)
            return ResponseEntity.badRequest().build();

        // Check if the entered id belongs to an appointment in the database - if it is present it gets deleted
        if(!service.isPresent(id, true))
            return ResponseEntity.notFound().build();

        service.deleteAppointmentSeries(id);
        return ResponseEntity.ok().build();
    }

    //endregion

    /**
     * Function to get all active appointments (active = deleted flag not set)
     * @return
     *      - Returns "Not found" if there are no active appointments in the database
     *      - Otherwise returns a list of all active appointments
     */
    @GetMapping("/all-appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        if(service.isEmpty(false))
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(service.getAppointments());
    }

    /**
     * Function to get all deleted appointments (deleted = deleted flag set)
     * @return
     *      - Returns a list of all deleted appointments
     */
    @GetMapping("/all-deleted-appointments")
    public ResponseEntity<List<Appointment>> getAllDeletedAppointments() {
        return ResponseEntity.ok(service.getDeletedAppointments());
    }

    /**
     * Function to get all active appointment series (active = deleted flag not set)
     * @return
     *      - Returns "Not found" if there are no appointment series in the database
     *      - Otherwise returns a list of all active appointment series
     */
    @GetMapping("/all-appointment-series")
    public ResponseEntity<List<AppointmentSeries>> getAllAppointmentSeries() {
        if(service.isEmpty(true))
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(service.getAppointmentSeries());
    }

    /**
     * Function to get all deleted appointment series (deleted = deleted flag set)
     * @return
     *      - Returns a list of all deleted appointment series
     */
    @GetMapping("/all-deleted-appointment-series")
    public ResponseEntity<List<AppointmentSeries>> getAllDeletedAppointmentSeries() {
        return ResponseEntity.ok(service.getDeletedAppointmentSeries());
    }

    /**
     * Function to get all active appointments on the specified date (active = deleted flag not set)
     * @param date Specifies which appointments are required
     * @return
     *      - Returns "Bad request" if the date parameter is null or the data parameter is not in the right format
     *      - Otherwise returns a list with all appointments on this date
     */
    @GetMapping("/appointments-date")
    public ResponseEntity<List<Appointment>> getAppointmentsByDate(@RequestParam String date) {
        if(date == null)
            return ResponseEntity.badRequest().build();

        try {
            LocalDate d = LocalDate.parse(date, df);
            return ResponseEntity.ok(service.getAppointmentsByDate(d));
        } catch (DateTimeParseException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Function to get all active appointments on the specified locations (active = deleted flag not set)
     * @param location Specify the requested locations
     * @return
     *      - Returns "Bad request" if the location is null or the array has no elements
     *      - Otherwise returns a list with all appointments on this locations
     */
    @GetMapping("/appointments-loc")
    public ResponseEntity<List<Appointment>> getAppointmentsByLocation(@RequestParam String[] location) {
        if(location == null || location.length == 0)
            return ResponseEntity.badRequest().build();

        // Add the appointments for all locations
        List<Appointment> appointments = new ArrayList<>();
        for(String loc : location) {
            appointments.addAll(service.getAppointmentsByLocation(loc));
        }

        return ResponseEntity.ok(appointments);
    }

    /**
     * Function to get all active appointment series on the specified locations (active = deleted flag not set)
     * @param location Specify the requested locations
     * @return
     *      - Returns "Bad request" if the location is null or the array has no elements
     *      - Otherwise returns a list with all appointment series on this locations
     */
    @GetMapping("/appointments-series-loc")
    public ResponseEntity<List<AppointmentSeries>> getAppointmentSeriesByLocation(@RequestParam String[] location) {
        if(location == null || location.length == 0)
            return ResponseEntity.badRequest().build();

        // Add the appointments series for all locations
        List<AppointmentSeries> appointmentSeries = new ArrayList<>();
        for(String loc : location) {
            appointmentSeries.addAll(service.getAppointmentSeriesByLocation(loc));
        }

        return ResponseEntity.ok(appointmentSeries);
    }

    /**
     * Function to get the number of all active appointments on the specified locations (active = deleted flag not set)
     * @param location Specify the requested locations
     * @return
     *      - Returns "Bad request" if the location is null or the array has no elements
     *      - Otherwise returns the number of active appointments on this locations
     */
    @GetMapping("/number-of-appointments-loc")
    public ResponseEntity<Integer> getNumberofAppointmentsByLocation(@RequestParam String[] location) {
        if(location == null || location.length == 0)
            return ResponseEntity.badRequest().build();

        // Add the appointments for all locations
        List<Appointment> appointments = new ArrayList<>();
        for(String loc : location) {
            appointments.addAll(service.getAppointmentsByLocation(loc));
        }

        return ResponseEntity.ok(appointments.size());
    }

    /**
     * Function to get all free and active appointments on the specified locations (active = deleted flag not set; free = booked is false)
     * @param location Specify the requested locations
     * @return
     *      - Returns "Bad request" if the location is null or the array has no elements
     *      - Otherwise returns all free and active appointments on this locations
     */
    @GetMapping("/free-appointments-loc")
    public ResponseEntity<List<Appointment>> getFreeAppointmentsByLocation(@RequestParam String[] location) {
        if(location == null || location.length == 0)
            return ResponseEntity.badRequest().build();

        // Add the appointments for all locations
        List<Appointment> appointments = new ArrayList<>();
        for(String loc : location) {
            appointments.addAll(service.getFreeAppointmentsByLocation(loc));
        }

        return ResponseEntity.ok(appointments);
    }

    /**
     * Function to get the number of all free and active appointments on the specified locations (active = deleted flag not set; free = booked is false)
     * @param location Specify the requested locations
     * @return
     *      - Returns "Bad request" if the location is null or the array has no elements
     *      - Otherwise returns the number of free and active appointments on this locations
     */
    @GetMapping("/number-of-free-appointments-loc")
    public ResponseEntity<Integer> getNumberOfFreeAppointmentsByLocation(@RequestParam String[] location) {
        if(location == null || location.length == 0)
            return ResponseEntity.badRequest().build();

        List<Appointment> appointments = new ArrayList<>();
        for(String loc : location) {
            appointments.addAll(service.getFreeAppointmentsByLocation(loc));
        }

        return ResponseEntity.ok(appointments.size());
    }

    /**
     * Function to check if the requested appointment would be valid (has now no overlaps)
     * @param appointment Specifies the requested appointment
     * @return
     *      - Returns "Bad request" if the appointment parameter is null
     *      - Returns false if there are any overlaps with existing appointments
     *      - Otherwise returns true
     */
    @PostMapping("/is-appointment-valid")
    public ResponseEntity<Boolean> getIfAppointmentIsValid(@RequestBody Appointment appointment) {
        if(appointment == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(service.isValid(appointment));
    }

    /**
     * Function to check if the requested appointment series would be valid (has now no overlaps)
     * @param appointmentSeries Specifies the requested appointment
     * @return
     *      - Returns "Bad request" if the appointment series parameter is null or the interval syntax is wrong
     *      - Returns false if there are any overlaps with existing appointments
     *      - Otherwise returns true
     */
    @PostMapping("/is-appointment-series-valid")
    public ResponseEntity<Boolean> getIfAppointmentSeriesIsValid(@RequestBody AppointmentSeries appointmentSeries) {
        if(appointmentSeries == null)
            return ResponseEntity.badRequest().build();

        // Check the syntax of the interval string
        if(!service.checkIntervalSyntax(appointmentSeries.getPeriodInterval()))
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(service.isValid(appointmentSeries));
    }

    /**
     * Function to get the number of appointments which a specified appointment series would create
     * @param appointmentSeries Specifies the appointment series
     * @return
     *      - Returns "Bad request if the appointment series parameter is null or the interval syntax is wrong
     *      - Returns the number of appointments the series would create
     */
    @PutMapping("/appointment-series/number-of-appointments")
    public ResponseEntity<Integer> getNumberOfAppointmentsOfAppointmentSeries(@RequestBody AppointmentSeries appointmentSeries) {
        if(appointmentSeries == null)
            return ResponseEntity.badRequest().build();

        // Check the syntax of the interval string
        if(!service.checkIntervalSyntax(appointmentSeries.getPeriodInterval()))
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(service.getNumberOfAppointments(appointmentSeries));
    }
}
