package com.assignment.coviddashboardapplication.entity;


import org.springframework.data.annotation.Id;

import javax.persistence.*;

@Entity
@Table (name="covid_data")
public class PatientData {
    @javax.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public String state;
    public int positive;
    public String negative;
    public String recovered;
    public int death;

    @Id
    @Column(name = "state", nullable = true)
    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
    @Basic
    @Column(name = "positive", nullable = true)
    public int getPositive() {
        return positive;
    }

    public void setPositive(int positive) {
        this.positive = positive;
    }
 
    @Basic
    @Column(name = "negative", nullable = true)
    public String getNegative() {
        return negative;
    }

    public void setNegative(String negative) {
        this.negative = negative;
    }

    @Basic
    @Column(name = "recovered", nullable = true)
    public String getRecovered() {
        return recovered;
    }

    public void setRecovered(String recovered) {
        this.recovered = recovered;
    }


    @Basic
    @Column(name = "death", nullable = true)
    public int getDeath() {
        return death;
    }

    public void setDeath(int death) {
        this.death = death;
    }
   

    public void setId(Long id) {
        this.id = id;
    }
    @Id
    @Column(name = "id", nullable = true)
    public Long getId() {
        return id;
    }
}
