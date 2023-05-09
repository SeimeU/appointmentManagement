package dke.appointment_Management.service;

import dke.appointment_Management.entity.Appointment;
import dke.appointment_Management.entity.AppointmentSeries;
import dke.appointment_Management.repository.AppointmentRepository;
import dke.appointment_Management.repository.AppointmentSeriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository repository;

    @Autowired
    private AppointmentSeriesRepository repositoryAS;

    public Appointment createAppointment(Appointment appointment) {
        return repository.save(appointment);
    }

    public AppointmentSeries createAppointmentSeries(AppointmentSeries appointmentSeries) {
        return repositoryAS.save(appointmentSeries);
    }

    public Appointment saveAppointment(Appointment appointment) {
        return repository.save(appointment);
    }

    public AppointmentSeries saveAppointmentSeries(AppointmentSeries appointmentSeries) {
        return repositoryAS.save(appointmentSeries);
    }

    public void deleteAppointment(Appointment appointment) {
        repository.delete(appointment);
    }

    public void deleteAppointmentSeries(AppointmentSeries appointmentSeries) {
        for (Appointment appointment : appointmentSeries.getAppointments()) {
            repository.delete(appointment);
        }
        repositoryAS.delete(appointmentSeries);
    }

    public List<Appointment> getAppointments() {
        return repository.findAll();
    }

    public List<AppointmentSeries> getAppointmentSeries() {
        return repositoryAS.findAll();
    }

    public Appointment getAppointmentById(int id) {
        return repository.findById(id).orElse(null);
    }

    public AppointmentSeries getAppointmentSeriesById(int id) {
        return repositoryAS.findById(id).orElse(null);
    }

    public List<Appointment> getAppointmentsByDate(Date date) {
        return repository.findAllByDate(date);
    }

    public List<Appointment> getAppointmentsByLocation(String[] locations) {
        return repository.findAllByLocations(locations);
    }

    public List<Appointment> getFreeAppointmentsByLocation(String[] locations) {
        return repository.findFreeByLocations(locations);
    }
 }
