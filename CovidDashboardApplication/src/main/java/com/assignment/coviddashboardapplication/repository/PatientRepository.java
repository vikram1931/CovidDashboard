package com.assignment.coviddashboardapplication.repository;

import com.assignment.coviddashboardapplication.entity.PatientData;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository  extends JpaRepository<PatientData, Long> {

    PatientData findByState(String state);
}
