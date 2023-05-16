package dke.appointment_Management.repository;

import dke.appointment_Management.entity.AppointmentSeries;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentSeriesRepository extends JpaRepository<AppointmentSeries, Long> {
}
