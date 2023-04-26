package dke.contact_tracing.entity;

import jakarta.persistence.*;

import java.sql.Date;
import java.util.List;

@Entity
public class Terminserie {
    //region Fields
    @Id
    @GeneratedValue
    private int id;

    @Temporal(TemporalType.DATE)
    private Date startDatum;

    @Temporal(TemporalType.DATE)
    private Date endDatum;

    private String intervall;
    private String anzahl;
    private Duration dauer;
    private String standort;
    private int linie;
    private String wirkstoff;

    @OneToMany
    @ElementCollection
    private List<Termin> termine;
    //endregion

    //region Constructor
    public Terminserie() {
    }

    public Terminserie(
            Date startDatum, Date endDatum, String intervall, String anzahl, Duration dauer, String standort,
            int linie, String wirkstoff, List<Termin> termine
    ) {
        this.startDatum = startDatum;
        this.endDatum = endDatum;
        this.intervall = intervall;
        this.anzahl = anzahl;
        this.dauer = dauer;
        this.standort = standort;
        this.linie = linie;
        this.wirkstoff = wirkstoff;
        this.termine = termine;
    }
    //endregion

    //region Getter/Setter

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getStartDatum() {
        return startDatum;
    }

    public void setStartDatum(Date startDatum) {
        this.startDatum = startDatum;
    }

    public Date getEndDatum() {
        return endDatum;
    }

    public void setEndDatum(Date endDatum) {
        this.endDatum = endDatum;
    }

    public String getIntervall() {
        return intervall;
    }

    public void setIntervall(String intervall) {
        this.intervall = intervall;
    }

    public String getAnzahl() {
        return anzahl;
    }

    public void setAnzahl(String anzahl) {
        this.anzahl = anzahl;
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

    public String getWirkstoff() {
        return wirkstoff;
    }

    public void setWirkstoff(String wirkstoff) {
        this.wirkstoff = wirkstoff;
    }

    public List<Termin> getTermine() {
        return termine;
    }

    public void setTermine(List<Termin> termine) {
        this.termine = termine;
    }

    //endregion

    @Override
    public String toString() {
        return "Person{" +
                "svnr=" + svnr +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", address=" + address +
                ", birthday=" + birthday +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", sickInformation=" + sickInformation +
                ", contacts=" + contacts +
                '}';
    }
}
