package dke.appointment_Management.repository;

import dke.appointment_Management.entity.AppointmentSeries;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentSeriesRepository extends JpaRepository<AppointmentSeries, Long> {
    List<AppointmentSeries> findAllByLocation(String location);
}
