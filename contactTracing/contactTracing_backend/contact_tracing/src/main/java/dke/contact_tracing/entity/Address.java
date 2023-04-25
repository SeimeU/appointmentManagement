package dke.contact_tracing.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Address {

    @Id
    @GeneratedValue
    private int id;
    private String streetName;
    private String doorNumber;
    private String county;
    private String state;
    private String country;

    public Address() {
    }

    public Address(int id, String streetName, String doorNumber, String county, String state, String country) {
        this.id = id;
        this.streetName = streetName;
        this.doorNumber = doorNumber;
        this.county = county;
        this.state = state;
        this.country = country;
    }

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getDoorNumber() {
        return doorNumber;
    }

    public void setDoorNumber(String doorNumber) {
        this.doorNumber = doorNumber;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return id == address.id && streetName.equals(address.streetName) && doorNumber.equals(address.doorNumber) && county.equals(address.county) && state.equals(address.state) && country.equals(address.country);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, streetName, doorNumber, county, state, country);
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", streetName='" + streetName + '\'' +
                ", doorNumber='" + doorNumber + '\'' +
                ", county='" + county + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                '}';
    }
}
