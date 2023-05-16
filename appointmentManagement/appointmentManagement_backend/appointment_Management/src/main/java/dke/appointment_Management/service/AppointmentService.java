package dke.appointment_Management.service;

import dke.appointment_Management.entity.Appointment;
import dke.appointment_Management.entity.AppointmentSeries;
import dke.appointment_Management.repository.AppointmentRepository;
import dke.appointment_Management.repository.AppointmentSeriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository repository;

    @Autowired
    private AppointmentSeriesRepository repositoryAS;

    public boolean isAvailable(long id, boolean appointmentSeries) {
        if(appointmentSeries) {
            Optional<AppointmentSeries> opt = repositoryAS.findById(id);

            return opt.isPresent();
        } else {
            Optional<Appointment> opt = repository.findById(id);

            return opt.isPresent();
        }
    }

    public boolean isEmpty(boolean appointmentSeries) {
        if(appointmentSeries) {
            return repositoryAS.count() == 0;
        } else {
            return repository.count() == 0;
        }
    }

    public Appointment saveAppointment(Appointment appointment) {
        return repository.save(appointment);
    }

    public AppointmentSeries saveAppointmentSeries(AppointmentSeries appointmentSeries) {
        return repositoryAS.save(appointmentSeries);
    }

    public void deleteAppointment(long id) {
        if(getAppointmentById(id) != null) {
            repository.delete(getAppointmentById(id));
        }
    }

    public void deleteAppointmentSeries(long id) {
        AppointmentSeries appointmentSeries = getAppointmentSeriesById(id);
        if(appointmentSeries == null)
            return;

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

    public Appointment getAppointmentById(long id) {
        return repository.findById(id).orElse(null);
    }

    public AppointmentSeries getAppointmentSeriesById(long id) {
        return repositoryAS.findById(id).orElse(null);
    }

    public List<Appointment> getAppointmentsByDate(Date date) {
        return repository.findAllByDate(date);
    }

    public List<Appointment> getAppointmentsByLocation(String location) {
        return repository.findAllByLocation(location);
    }

    public List<Appointment> getFreeAppointmentsByLocation(String location) {
        return repository.findAllByLocation(location).stream().filter(a -> !a.isBooked()).collect(Collectors.toList());
    }
 }
