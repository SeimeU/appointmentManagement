package dke.appointment_Management;

import dke.appointment_Management.entity.Appointment;
import dke.appointment_Management.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;

@SpringBootApplication
public class AppointmentManagementApplication implements CommandLineRunner {

	@Autowired
	private AppointmentRepository appointmentRepository;

	public static void main(String[] args) {
		SpringApplication.run(AppointmentManagementApplication.class, args);
	}

	public void run(String... args) {
		// Cleanup database tables.
		appointmentRepository.deleteAll();

		// Create dummy data
		Appointment appointment21_drug = new Appointment();
		appointment21_drug.setDate(LocalDateTime.of(2023, 6, 21, 10, 0));
		appointment21_drug.setLocation("Rathaus Marchtrenk");
		appointment21_drug.setLine(1);
		appointment21_drug.setBooked(false);
		appointment21_drug.setDuration(10);
		appointment21_drug.setSubstance("Remdesivir");
		appointmentRepository.save(appointment21_drug);

		Appointment appointment21_vacc = new Appointment();
		appointment21_vacc.setDate(LocalDateTime.of(2023, 6, 21, 10, 0));
		appointment21_vacc.setLocation("Wels Landhof");
		appointment21_vacc.setLine(1);
		appointment21_vacc.setBooked(false);
		appointment21_vacc.setDuration(10);
		appointment21_vacc.setSubstance("Comirnaty (BioNTech/Pfizer)");
		appointmentRepository.save(appointment21_vacc);

		Appointment appointment22_drug = new Appointment();
		appointment22_drug.setDate(LocalDateTime.of(2023, 6, 22, 15, 0));
		appointment22_drug.setLocation("Rathaus Marchtrenk");
		appointment22_drug.setLine(2);
		appointment22_drug.setBooked(false);
		appointment22_drug.setDuration(10);
		appointment22_drug.setSubstance("Molnupiravir");
		appointmentRepository.save(appointment22_drug);

		Appointment appointment22_vacc = new Appointment();
		appointment22_vacc.setDate(LocalDateTime.of(2023, 6, 22, 17, 0));
		appointment22_vacc.setLocation("Wels Landhof");
		appointment22_vacc.setLine(2);
		appointment22_vacc.setBooked(false);
		appointment22_vacc.setDuration(10);
		appointment22_vacc.setSubstance("Spikevax (Moderna)");
		appointmentRepository.save(appointment22_vacc);

		Appointment appointment23_drug = new Appointment();
		appointment23_drug.setDate(LocalDateTime.of(2023, 6, 23, 9, 0));
		appointment23_drug.setLocation("Rathaus Linz");
		appointment23_drug.setLine(2);
		appointment23_drug.setBooked(false);
		appointment23_drug.setDuration(10);
		appointment23_drug.setSubstance("Dexamethason");
		appointmentRepository.save(appointment23_drug);

		Appointment appointment23_vacc = new Appointment();
		appointment23_vacc.setDate(LocalDateTime.of(2023, 6, 23, 19, 0));
		appointment23_vacc.setLocation("Linzer Markt");
		appointment23_vacc.setLine(1);
		appointment23_vacc.setBooked(false);
		appointment23_vacc.setDuration(10);
		appointment23_vacc.setSubstance("Vaxzevria (AstraZeneca)");
		appointmentRepository.save(appointment23_vacc);
	}
}
