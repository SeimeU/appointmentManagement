package dke.appointment_Management.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Appointment {
    //region Fields
    @Id
    @GeneratedValue
    private long id;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime date;

    private int duration;
    private String location;
    private int line;
    private boolean booked;
    private String substance;
    private boolean deleted;
    //endregion

    //region Constructor
    public Appointment() {
    }

    public Appointment(
            LocalDateTime date, int duration,
            String location, int line, boolean booked, String substance, boolean deleted
    ) {
        this.date = date;
        this.duration = duration;
        this.location = location;
        this.line = line;
        this.booked = booked;
        this.substance = substance;
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

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
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

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
    //endregion

    @Override
    public String toString() {
        return "Termin{" +
                "Datum=" + this.date +
                ", Dauer='" + this.duration + '\'' +
                ", Standort='" + this.location + '\'' +
                ", Linie='" + this.line + '\'' +
                ", Gebucht='" + this.booked + '\'' +
                ", Wirkstoff='" + this.substance + '\'' +
                ", Gelöscht='" + this.deleted + '\'' +
                '}';
    }
}
