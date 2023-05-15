package dke.appointment_Management.repository;

import dke.appointment_Management.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    List<Appointment> findAllByDate(Date date);

    List<Appointment> findAllByLocation(String[] location);

    List<Appointment> findFreeByLocation(String[] location);
}
