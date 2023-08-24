package com.assignment.coviddashboardapplication.repositoryservice;

import com.assignment.coviddashboardapplication.entity.PatientData;
import com.assignment.coviddashboardapplication.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientDataService {

    @Autowired
    private PatientRepository patientRepository;

    public PatientData savePatientData(PatientData patientData){
       return patientRepository.save(patientData);
    }

    public List<PatientData> savePatientDataList(List<PatientData> patientDataList){
        return patientRepository.saveAll(patientDataList);
    }

    public List<PatientData> getAllStatesData(){
        return patientRepository.findAll();
    }

    public PatientData getPatientDataByState(String state){
        return patientRepository.findByState(state);
    }
}
