package dke.appointment_Management.repository;

import dke.appointment_Management.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findAllByDeleted(boolean deleted);

    List<Appointment> findAllByLocation(String location);
}
