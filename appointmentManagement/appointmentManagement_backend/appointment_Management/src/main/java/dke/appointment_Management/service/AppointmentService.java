package dke.appointment_Management.service;

import dke.appointment_Management.entity.Appointment;
import dke.appointment_Management.entity.AppointmentSeries;
import dke.appointment_Management.repository.AppointmentRepository;
import dke.appointment_Management.repository.AppointmentSeriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
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

    /**
     * Function to check if the requested appointment (series) is available
     * @param id Specifies the requested appointment
     * @param appointmentSeries Specifies if the id should belong to an appointment or an appointment series (true = appointment series)
     * @return
     *      - Returns true if there is an appointment/appointment series with this id in the database (which is also not flagged as deleted)
     *      - Returns false if there is no appointment/appointment series with this id or the appointment/appointment series with this id is flagged as deleted
     */
    public boolean isPresent(long id, boolean appointmentSeries) {
        if(appointmentSeries) {
            Optional<AppointmentSeries> opt = repositoryAS.findById(id);

            // Appointment series is present
            return opt.isPresent() && !opt.get().isDeleted();
        } else {
            Optional<Appointment> opt = repository.findById(id);

            // Appointment is present
            return opt.isPresent() && !opt.get().isDeleted();
        }
    }

    /**
     * Function to check if the repository is empty
     * @param appointmentSeries Specifies if the appointment repository or the appointment series repository needs to be checked
     * @return
     *      - Returns false if the repository is empty
     *      - Otherwise returns true
     */
    public boolean isEmpty(boolean appointmentSeries) {
        if(appointmentSeries) {
            return repositoryAS.count() == 0;
        } else {
            return repository.count() == 0;
        }
    }

    /**
     * Function to create/save an appointment
     * @param appointment Specifies the appointment to save/create
     * @return
     *      - Returns the created/saved appointment
     */
    public Appointment saveAppointment(Appointment appointment) {
        return repository.save(appointment);
    }

    /**
     * Function to create/save an appointment series
     * @param appointmentSeries Specifies the appointment series to save/create
     * @return
     *      - Returns the created/saved appointment series
     */
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
        repository.saveAll(appointmentSeries.getAppointments());

        return repositoryAS.save(appointmentSeries);
    }

    /**
     * Function to return all active appointments (active = deleted flag is not set)
     * @return
     *      - Returns a list of all active appointments
     */
    public List<Appointment> getAppointments() {
        return repository.findAllByDeleted(false);
    }

    /**
     * Function to return all deleted appointments (deleted = deleted flag is set)
     * @return
     *      - Returns a list of all deleted appointments
     */
    public List<Appointment> getDeletedAppointments() {
        return repository.findAllByDeleted(true);
    }

    /**
     * Function to return all active appointment series (active = deleted flag is not set)
     * @return
     *      - Returns a list of all active appointment series
     */
    public List<AppointmentSeries> getAppointmentSeries() {
        return repositoryAS.findAllByDeleted(false);
    }

    /**
     * Function to return all deleted appointment series (deleted = deleted flag is set)
     * @return
     *      - Returns a list of all deleted appointment series
     */
    public List<AppointmentSeries> getDeletedAppointmentSeries() {
        return repositoryAS.findAllByDeleted(true);
    }

    /**
     * Function to get an appointment
     * @param id Specifies the requested appointment
     * @return
     *      - Returns the requested appointment
     */
    public Appointment getAppointmentById(long id) {
        return repository.findById(id).orElse(null);
    }

    /**
     * Function to get an appointment series
     * @param id Specifies the requested appointment series
     * @return
     *      - Returns the requested appointment series
     */
    public AppointmentSeries getAppointmentSeriesById(long id) {
        return repositoryAS.findById(id).orElse(null);
    }

    /**
     * Function to get all active appointments on the specified date (active = deleted flag not set)
     * @param date Specifies the requested date
     * @return
     *      - Returns a list with all appointments on the specified date
     */
    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        List<Appointment> appointments = getAppointments();

        return appointments.stream().filter(a -> a.getDate().toLocalDate().equals(date)).collect(Collectors.toList());
    }

    /**
     * Function to get all active appointments on the specified location (active = deleted flag not set)
     * @param location Specifies the requested location
     * @return
     *      - Returns a list with all appointments on the specified location
     */
    public List<Appointment> getAppointmentsByLocation(String location) {
        return repository.findAllByLocation(location).stream().filter(a -> !a.isDeleted()).collect(Collectors.toList());
    }

    /**
     * Function to get all active appointment series on the specified location (active = deleted flag not set)
     * @param location Specifies the requested location
     * @return
     *      - Returns a list with all appointment series on the specified location
     */
    public List<AppointmentSeries> getAppointmentSeriesByLocation(String location) {
        return repositoryAS.findAllByLocation(location).stream().filter(a -> !a.isDeleted()).collect(Collectors.toList());
    }

    /**
     * Function to get all free and active appointments on the specified location (active = deleted flag not set; free = booked is false)
     * @param location Specifies the requested location
     * @return
     *      - Returns a list with all free appointments on the specified location
     */
    public List<Appointment> getFreeAppointmentsByLocation(String location) {
        return repository.findAllByLocation(location).stream().filter(a -> !a.isBooked() && !a.isDeleted()).collect(Collectors.toList());
    }

    /**
     * Function to check if there is any overlap of the new appointment with an existing appointment
     * @param appointment Specifies the new appointment that needs to be created
     * @return
     *      - Returns false if there is an overlap with an existing appointment on the same location, line and date + time (excludes deleted appointments)
     *      - Otherwise returns true
     */
    public boolean isValid(Appointment appointment) {
        // Get all appointments on this location and this line
        List<Appointment> appointments = getAppointmentsByLocation(appointment.getLocation()).stream().filter(a -> a.getLine() == appointment.getLine()).toList();

        for(Appointment a : appointments) {
            // If an appointment is found with the same date which is not the requested appointment return false
            if(a.getDate().isEqual(appointment.getDate()) && a.getId() != appointment.getId()) {
                return false;
            }
        }

        // No overlap
        return true;
    }

    /**
     * Function to check if there is any overlap of the new appointment series (+ the corresponding appointments) with an existing appointment
     * @param appointmentSeries Specifies the new appointment series that needs to be created
     * @return
     *      - Returns false if there is an overlap with an existing appointment on the same location, line and date + time (excludes deleted appointments)
     *      - Otherwise returns true
     */
    public boolean isValid(AppointmentSeries appointmentSeries) {
        // Get all appointments on this location and this line
        List<Appointment> appointments = getAppointmentsByLocation(appointmentSeries.getLocation()).stream().filter(a -> a.getLine() == appointmentSeries.getLine()).toList();

        // Get all temporary appointments for this appointment series
        List<Appointment> tempAppointments = createAppointmentsForSeries(appointmentSeries);

        for(Appointment a : appointments) {
            assert tempAppointments != null;
            for(Appointment ta : tempAppointments) {
                // If an appointment is found with the same date return false
                if(a.getDate().isEqual(ta.getDate())) {
                    return false;
                }
            }
        }

        // No overlap
        return true;
    }

    /**
     * Function to check if the passed interval string has the right syntax
     * @param interval string of the requested appointment series
     * @return
     *      - Returns false if the interval string is null or the interval string does not match any interval pattern (daily, weekly, monthly)
     *      - Otherwise returns true
     */
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

    /**
     * Function to delete an appointment - set the delete flag
     * @param id Specifies which appointment should be deleted
     */
    public void deleteAppointment(long id) {
        Appointment appointment = getAppointmentById(id);
        if(appointment != null) {
            appointment.setDeleted(true);
            repository.save(appointment);
        }
    }

    /**
     * Function to delete an appointment series - set the delete flag
     * @param id Specifies which appointment series should be deleted
     */
    public void deleteAppointmentSeries(long id) {
        AppointmentSeries appointmentSeries = getAppointmentSeriesById(id);
        if(appointmentSeries == null)
            return;

        // Also delete every appointment in the appointment series
        for (Appointment appointment : appointmentSeries.getAppointments()) {
            deleteAppointment(appointment.getId());
        }
        appointmentSeries.setDeleted(true);
        repositoryAS.save(appointmentSeries);
    }

    //endregion

    //region private auxiliary functions

    /**
     * Function to create all appointments for the specified appointment series (for the selected interval)
     * @param appointmentSeries Specifies the requested appointment series
     * @return
     *      - Returns the created appointments as a list
     */
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

                // While the temporary date is before the end date (the or connection is there so that also on the last day anappointment gets created) - create appointments
                while (tempDate.isBefore(appointmentSeries.getEndDate()) || tempDate.isEqual(appointmentSeries.getEndDate())) {
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
                while (tempDate.isBefore(appointmentSeries.getEndDate()) || tempDate.isEqual(appointmentSeries.getEndDate())) {
                    // Run through the coming week and create appointments on the selected days
                    for (int i = 0; i < 7 && (cur.isBefore(appointmentSeries.getEndDate()) || cur.isEqual(appointmentSeries.getEndDate())); i++) {
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
                    tempDate = tempDate.with(TemporalAdjusters.dayOfWeekInMonth(period, DayOfWeek.of(weekday)));
                }

                // While the temporary date is before the end date - create appointments
                while (tempDate.isBefore(appointmentSeries.getEndDate())) {
                    appointments.addAll(create(appointmentSeries, tempDate));
                    tempDate = tempDate.plusMonths(months);
                    tempDate = tempDate.with(TemporalAdjusters.dayOfWeekInMonth(period, DayOfWeek.of(weekday)));
                }
                return appointments;
            }
        }

        return null;
    }

    /**
     * Function to create the number of appointments specified in the appointment series on the specified date
     * @param appointmentSeries Specifies the appointment series
     * @param date Specifies the date on which the appointments should get created
     * @return
     *      - Returns the created appointments as a list
     */
    private List<Appointment> create(AppointmentSeries appointmentSeries, LocalDateTime date) {
        List<Appointment> appointments = new ArrayList<>();
        LocalDateTime tempDate = date;

        for(int i = 0;i < appointmentSeries.getNumber();i++) {
            appointments.add(new Appointment(tempDate, appointmentSeries.getDuration(), appointmentSeries.getLocation(), appointmentSeries.getLine(), false, appointmentSeries.getSubstance(), false));
            tempDate = tempDate.plusMinutes(appointmentSeries.getDuration());
        }
        return appointments;
    }
    //endregion
 }
