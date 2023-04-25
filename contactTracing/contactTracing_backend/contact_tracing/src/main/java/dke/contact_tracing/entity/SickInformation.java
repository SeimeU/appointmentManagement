package dke.contact_tracing.entity;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class SickInformation {

    @Id
    @GeneratedValue
    private int id;

    private boolean symptoms;
    private boolean sick;
    @Temporal(TemporalType.DATE)
    private Date symptomStartingDate;
    @Temporal(TemporalType.DATE)
    private Date covidTestDate;
    @Temporal(TemporalType.DATE)
    private Date medicationDate;

    private boolean quarantine;
    @Temporal(TemporalType.DATE)
    private Date quarantineStartDate;
    @Temporal(TemporalType.DATE)
    private Date quarantineEndDate;

    public SickInformation() {
    }

    public SickInformation(
            int id, boolean symptoms, boolean sick, Date symptomStartingDate, Date covidTestDate, Date medicationDate,
            boolean quarantine, Date quarantineStartDate, Date quarantineEndDate
    ) {
        this.id = id;
        this.symptoms = symptoms;
        this.sick = sick;
        this.symptomStartingDate = symptomStartingDate;
        this.covidTestDate = covidTestDate;
        this.medicationDate = medicationDate;
        this.quarantine = quarantine;
        this.quarantineStartDate = quarantineStartDate;
        this.quarantineEndDate = quarantineEndDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isSymptoms() {
        return symptoms;
    }

    public void setSymptoms(boolean symptoms) {
        this.symptoms = symptoms;
    }

    public Date getSymptomStartingDate() {
        return symptomStartingDate;
    }

    public boolean isSick() {
        return sick;
    }

    public void setSick(boolean sick) {
        this.sick = sick;
    }

    public void setSymptomStartingDate(Date symptomStartingDate) {
        this.symptomStartingDate = symptomStartingDate;
    }

    public Date getCovidTestDate() {
        return covidTestDate;
    }

    public void setCovidTestDate(Date covidTestDate) {
        this.covidTestDate = covidTestDate;
    }

    public Date getMedicationDate() {
        return medicationDate;
    }

    public void setMedicationDate(Date medicationDate) {
        this.medicationDate = medicationDate;
    }

    public boolean isQuarantine() {
        return quarantine;
    }

    public void setQuarantine(boolean quarantine) {
        this.quarantine = quarantine;
    }

    public Date getQuarantineStartDate() {
        return quarantineStartDate;
    }

    public void setQuarantineStartDate(Date quarantineStartDate) {
        this.quarantineStartDate = quarantineStartDate;
    }

    public Date getQuarantineEndDate() {
        return quarantineEndDate;
    }

    public void setQuarantineEndDate(Date quarantineEndDate) {
        this.quarantineEndDate = quarantineEndDate;
    }

    @Override
    public String toString() {
        return "SickInformation{" +
                "id=" + id +
                ", symptoms=" + symptoms +
                ", sick=" + sick +
                ", symptomStartingDate=" + symptomStartingDate +
                ", covidTestDate=" + covidTestDate +
                ", medicationDate=" + medicationDate +
                ", quarantine=" + quarantine +
                ", quarantineStartDate=" + quarantineStartDate +
                ", quarantineEndDate=" + quarantineEndDate +
                '}';
    }
}
