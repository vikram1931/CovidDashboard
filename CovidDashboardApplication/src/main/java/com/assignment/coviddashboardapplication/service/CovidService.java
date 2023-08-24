package com.assignment.coviddashboardapplication.service;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.assignment.coviddashboardapplication.entity.PatientData;
import com.assignment.coviddashboardapplication.repository.PatientRepository;
import com.assignment.coviddashboardapplication.repositoryservice.PatientDataService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class CovidService {

    private final String REST_API_URL = "https://api.covidtracking.com/v1/states/{state}/current.json";

    //https://api.covidtracking.com/v1/states/ca/current.json
//    @Autowired
//    private PatientRepository patientRepository;
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private PatientDataService patientDataService;
    public String fetchCovidPatientsList(String state) {

         String patientDataString = fetchDataFromApi(state);
        ObjectMapper objectMapper = new ObjectMapper();
        PatientData patientData = null;
        try {
            patientData = objectMapper.readValue(patientDataString,PatientData.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        // Save items to the database
     //  patientRepository.save(patientData);
       return patientDataString;
    }
    public String fetchDataFromApi(String state) {
        String apiUrl = REST_API_URL;

        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(apiUrl);
        String uri = builder.buildAndExpand(state).toUriString();
        System.out.println(" UI "+ uri);

        return restTemplate.getForObject(uri, String.class);
    }

    //Fetches PatientData By State

    public PatientData fetchPatientDataByState(String state){
       return patientDataService.getPatientDataByState(state);
    }

    public List<PatientData> fetchAllStatesData(){
        return patientDataService.getAllStatesData();
    }

}
