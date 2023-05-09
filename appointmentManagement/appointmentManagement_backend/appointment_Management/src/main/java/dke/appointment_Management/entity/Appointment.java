package dke.appointment_Management.entity;

import jakarta.persistence.*;

import java.sql.Date;
import java.time.Duration;

@Entity
public class Appointment {
    //region Fields
    @Id
    @GeneratedValue
    private int id;

    @Temporal(TemporalType.DATE)
    private Date date;
    private Duration duration;
    private String location;
    private int line;
    private boolean booked;
    private String substance;
    //endregion

    //region Constructor
    public Appointment() {
    }

    public Appointment(
            Date date, Duration duration,
            String location, int line, boolean booked, String substance
    ) {
        this.date = date;
        this.duration = duration;
        this.location = location;
        this.line = line;
        this.booked = booked;
        this.substance = substance;
    }
    //endregion

    //region Getter/Setter

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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

    public boolean isBooked() {
        return booked;
    }

    public void setBooked(boolean booked) {
        this.booked = booked;
    }

    public String getSubstance() {
        return substance;
    }

    public void setSubstance(String substance) {
        this.substance = substance;
    }

    //endregion

    @Override
    public String toString() {
        return "Termin{" +
                "Datum=" + this.date +
                ", Dauer='" + this.duration + '\'' +
                ", Standort='" + this.location + '\'' +
                ", Linie=" + this.line +
                ", Gebucht=" + this.booked +
                ", Wirkstoff='" + this.substance +
                '}';
    }
}