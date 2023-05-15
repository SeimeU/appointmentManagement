package dke.appointment_Management.entity;

import jakarta.persistence.*;

import java.sql.Date;
import java.time.Duration;
import java.util.List;

@Entity
public class AppointmentSeries {
    //region Fields
    @Id
    @GeneratedValue
    private long id;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    private String interval;
    private String number;
    private Duration duration;
    private String location;
    private int line;
    private String substance;

    @OneToMany
    //@ElementCollection
    //@OneToMany(fetch = FetchType.LAZY, cascade=CascadeType.MERGE)
    //@JoinTable(name = "appointmentSeries_appointments", joinColumns = @JoinColumn(name = "AppointmentSeries_id"), inverseJoinColumns = @JoinColumn(name = "Appointment_id"))
    private List<Appointment> appointments;
    //endregion

    //region Constructor
    public AppointmentSeries() {
    }

    public AppointmentSeries(
            Date startDate, Date endDate, String interval, String number, Duration duration, String location,
            int line, String substance, List<Appointment> appointments
    ) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.interval = interval;
        this.number = number;
        this.duration = duration;
        this.location = location;
        this.line = line;
        this.substance = substance;
        this.appointments = appointments;
    }
    //endregion

    //region Getter/Setter

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getInterval() {
        return interval;
    }

    public void setInterval(String interval) {
        this.interval = interval;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getLine() {
        return line;
    }

    public void setLine(int line) {
        this.line = line;
    }

    public String getSubstance() {
        return substance;
    }

    public void setSubstance(String substance) {
        this.substance = substance;
    }


    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    //endregion

    @Override
    public String toString() {
        return "Terminserie{" +
                "Startdatum=" + this.startDate +
                ", Enddatum=" + this.endDate +
                ", Anzahl=" + this.number +
                ", Intervall=" + this.interval +
                ", Dauer='" + this.duration + '\'' +
                ", Standort='" + this.location + '\'' +
                ", Linie=" + this.line +
                ", Wirkstoff='" + this.substance +
                ", Anzahl Termine=" + this.appointments.size() +
                '}';
    }
}
