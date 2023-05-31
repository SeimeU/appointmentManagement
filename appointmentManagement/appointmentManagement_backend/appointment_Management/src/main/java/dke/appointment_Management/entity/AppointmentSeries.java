package dke.appointment_Management.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class AppointmentSeries {
    //region Fields
    @Id
    @GeneratedValue
    private long id;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime endDate;

    private String period_interval;
    private int number;
    private int duration;
    private String location;
    private int line;
    private String substance;
    private boolean deleted;

    @OneToMany
    private List<Appointment> appointments;
    //endregion

    //region Constructor
    public AppointmentSeries() {
    }

    public AppointmentSeries(
            LocalDateTime startDate, LocalDateTime endDate, String interval, int number, int duration, String location,
            int line, String substance, List<Appointment> appointments, boolean deleted
    ) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.period_interval = interval;
        this.number = number;
        this.duration = duration;
        this.location = location;
        this.line = line;
        this.substance = substance;
        this.appointments = appointments;
        this.deleted = deleted;
    }
    //endregion

    //region Getter/Setter

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getInterval() {
        return period_interval;
    }

    public void setInterval(String interval) {
        this.period_interval = interval;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
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

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    //endregion

    @Override
    public String toString() {
        return "Terminserie{" +
                "Startdatum=" + this.startDate +
                ", Enddatum=" + this.endDate +
                ", Anzahl=" + this.number +
                ", Intervall=" + this.period_interval +
                ", Dauer='" + this.duration + '\'' +
                ", Standort='" + this.location + '\'' +
                ", Linie=" + this.line +
                ", Wirkstoff='" + this.substance +
                ", Gelöscht='" + this.deleted +
                '}';
    }
}
