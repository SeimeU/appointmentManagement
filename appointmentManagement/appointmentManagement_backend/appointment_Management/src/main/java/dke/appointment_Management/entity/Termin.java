package dke.contact_tracing.entity;

import jakarta.persistence.*;

import java.sql.Date;
import java.util.List;

@Entity
public class Termin {
    //region Fields
    @Id
    @GeneratedValue
    private int id;

    @Temporal(TemporalType.DATE)
    private Date datum;
    private Duration dauer;
    private String standort;
    private int linie;
    private boolean gebucht;
    private String wirkstoff;
    //endregion

    //region Constructor
    public Termin() {
    }

    public Termin(
            Date datum, Duration dauer,
            String standort, int linie, boolean gebucht, String wirkstoff
    ) {
        this.datum = datum;
        this.dauer = dauer;
        this.standort = standort;
        this.linie = linie;
        this.gebucht = gebucht;
        this.wirkstoff = wirkstoff;
    }
    //endregion

    //region Getter/Setter

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDatum() {
        return datum;
    }

    public void setDatum(Date datum) {
        this.datum = datum;
    }

    public Duration getDauer() {
        return dauer;
    }

    public void setDauer(Duration dauer) {
        this.dauer = dauer;
    }

    public String getStandort() {
        return standort;
    }

    public void setStandort(String standort) {
        this.standort = standort;
    }

    public int getLinie() {
        return linie;
    }

    public void setLinie(int linie) {
        this.linie = linie;
    }

    public boolean isGebucht() {
        return gebucht;
    }

    public void setGebucht(boolean gebucht) {
        this.gebucht = gebucht;
    }

    public String getWirkstoff() {
        return wirkstoff;
    }

    public void setWirkstoff(String wirkstoff) {
        this.wirkstoff = wirkstoff;
    }

    //endregion

    @Override
    public String toString() {
        return "Termin{" +
                "Datum=" + this.datum +
                ", Dauer='" + this.dauer + '\'' +
                ", Standort='" + this.standort + '\'' +
                ", Linie=" + this.linie +
                ", Gebucht=" + this.gebucht +
                ", Wirkstoff='" + this.wirkstoff +
                '}';
    }
}
