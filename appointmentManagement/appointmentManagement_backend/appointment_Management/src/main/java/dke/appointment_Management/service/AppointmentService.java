package dke.appointment_Management.service;

import dke.appointment_Management.entity.Appointment;
import dke.appointment_Management.entity.AppointmentSeries;
import dke.appointment_Management.repository.AppointmentRepository;
import dke.appointment_Management.repository.AppointmentSeriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    //region Constants
    private final String DAILY_REGEX = "daily;\\d";
    private final String WEEKLY_REGEX = "weekly;\\d;\\d(,\\d)*";
    private final String MONTHLY_REGEX = "monthly;\\d;\\d;\\d";
    //endregion

    @Autowired
    private AppointmentRepository repository;

    @Autowired
    private AppointmentSeriesRepository repositoryAS;

    //region public service functions

    // Function to check if the requested appointment (series) is available
    public boolean isAvailable(long id, boolean appointmentSeries) {
        if(appointmentSeries) {
            Optional<AppointmentSeries> opt = repositoryAS.findById(id);

            return opt.isPresent();
        } else {
            Optional<Appointment> opt = repository.findById(id);

            return opt.isPresent();
        }
    }

    // Function to check if the repository is empty
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
        // Check if the appointmentSeries changed
        if(repositoryAS.findById(appointmentSeries.getId()).isPresent()) {
            AppointmentSeries as = repositoryAS.findById(appointmentSeries.getId()).get();
            if(as.equals(appointmentSeries)) {
                return repositoryAS.save(appointmentSeries);
            }

            // Delete all appointments
            for(Appointment a : appointmentSeries.getAppointments()) {
                deleteAppointment(a.getId());
            }
        }


        // Create new appointments
        appointmentSeries.setAppointments(createAppointmentsForSeries(appointmentSeries));

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

        // Also delete every appointment in the appointment series
        for (Appointment appointment : appointmentSeries.getAppointments()) {
            deleteAppointment(appointment.getId());
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

    public List<AppointmentSeries> getAppointmentSeriesByLocation(String location) {
        return repositoryAS.findAllByLocation(location);
    }

    public List<Appointment> getFreeAppointmentsByLocation(String location) {
        return repository.findAllByLocation(location).stream().filter(a -> !a.isBooked()).collect(Collectors.toList());
    }

    // Function to check if there is any overlap of the new appointment with an existing appointment on the same location and line
    public boolean isValid(Appointment appointment) {
        // Get all appointments on this location and this line
        List<Appointment> appointments = getAppointmentsByLocation(appointment.getLocation()).stream().filter(a -> a.getLine() == appointment.getLine()).toList();

        for(Appointment a : appointments) {
            // If a appointment is found with the same date return false
            if(a.getDate().isEqual(appointment.getDate())) {
                return false;
            }
        }

        // No appointment on this location, line and date
        return true;
    }

    // Function to check if there are overlaps of the new appointments with the existing ones on the same location and line
    public boolean isValid(AppointmentSeries appointmentSeries) {
        // Get all appointments on this location and this line
        List<Appointment> appointments = getAppointmentsByLocation(appointmentSeries.getLocation()).stream().filter(a -> a.getLine() == appointmentSeries.getLine()).toList();

        List<Appointment> tempAppointments = createAppointmentsForSeries(appointmentSeries);

        for(Appointment a : appointments) {
            assert tempAppointments != null;
            for(Appointment ta : tempAppointments) {
                // If a appointment is found with the same date return false
                if(a.getDate().isEqual(ta.getDate())) {
                    // Delete temporary appointments
                    deleteAppointments(tempAppointments);
                    return false;
                }
            }
        }

        deleteAppointments(tempAppointments);
        return true;
    }

    // Function to check if the passed interval string has the right syntax
    public boolean checkIntervalSyntax(String interval) {
        if(interval == null) {
            return false;
        }
        Pattern dailyPattern = Pattern.compile(DAILY_REGEX);
        Pattern weekylPattern = Pattern.compile(WEEKLY_REGEX);
        Pattern monthlyPattern = Pattern.compile(MONTHLY_REGEX);

        // Check if the interval syntax matches any of the regex patterns
        return dailyPattern.matcher(interval).matches() || weekylPattern.matcher(interval).matches() || monthlyPattern.matcher(interval).matches();
    }
    //endregion

    //region private auxiliary functions
    private List<Appointment> createAppointmentsForSeries(AppointmentSeries appointmentSeries) {
        // Split the interval string - to get all data
        String[] temp = appointmentSeries.getInterval().split(";");

        LocalDateTime tempDate;
        List<Appointment> appointments = new ArrayList<>();

        // Switch according to the selected time period
        switch (temp[0]) {
            case "daily" -> {
                // Get the value of the selector - every ... days
                int days = Integer.parseInt(temp[1]);
                tempDate = appointmentSeries.getStartDate();

                // While the temporary date is before the end date - create appointments
                while (tempDate.isBefore(appointmentSeries.getEndDate())) {
                    appointments.addAll(create(appointmentSeries, tempDate));
                    tempDate = tempDate.plusDays(days);
                }
                return appointments;
            }
            case "weekly" -> {
                // Get the value of the selector - every ... weeks
                int weeks = Integer.parseInt(temp[1]);
                // Get the selected weekdays
                String[] weekdays = temp[2].split(",");
                tempDate = appointmentSeries.getStartDate();
                LocalDateTime cur = tempDate;

                // While the temporary date is before the end date - create appointments
                while (tempDate.isBefore(appointmentSeries.getEndDate())) {
                    // Run through the coming week and create appointments on the selected days
                    for (int i = 0; i < 7; i++) {
                        LocalDateTime finalCur = cur;
                        // Check if the current day is available in the weekdays array
                        if (Arrays.stream(weekdays).anyMatch(d -> Integer.parseInt(d) == finalCur.getDayOfWeek().getValue())) {
                            appointments.addAll(create(appointmentSeries, cur));
                        }
                        cur = cur.plusDays(1);
                    }

                    tempDate = tempDate.plusWeeks(weeks);
                    cur = tempDate;
                }
                return appointments;
            }
            case "monthly" -> {
                // Get the value of the selector - every ... months
                int months = Integer.parseInt(temp[1]);
                // Get the value of the selector - every ... (e.g. second) tuesday
                int period = Integer.parseInt(temp[2]);
                // Get the value of the selector for the weekday
                int weekday = Integer.parseInt(temp[3]);

                // Initialize temp date with the selected settings
                tempDate = appointmentSeries.getStartDate().with(TemporalAdjusters.dayOfWeekInMonth(period, DayOfWeek.of(weekday)));
                // Check if the current e.g. "second monday" is before the start date - add one month if true
                if (tempDate.isBefore(appointmentSeries.getStartDate())) {
                    tempDate = tempDate.plusMonths(1);
                }

                // While the temporary date is before the end date - create appointments
                while (tempDate.isBefore(appointmentSeries.getEndDate())) {
                    appointments.addAll(create(appointmentSeries, tempDate));
                    tempDate = tempDate.plusMonths(months);
                }
                return appointments;
            }
        }

        return null;
    }

    private List<Appointment> create(AppointmentSeries appointmentSeries, LocalDateTime date) {
        List<Appointment> appointments = new ArrayList<>();

        for(int i = 0;i < appointmentSeries.getNumber();i++) {
            appointments.add(saveAppointment(new Appointment(date, appointmentSeries.getDuration(), appointmentSeries.getLocation(), appointmentSeries.getLine(), false, appointmentSeries.getSubstance())));
        }
        return appointments;
    }


    private void deleteAppointments(List<Appointment> appointments) {
        for(Appointment a : appointments) {
            deleteAppointment(a.getId());
        }
    }
    //endregion
 }
