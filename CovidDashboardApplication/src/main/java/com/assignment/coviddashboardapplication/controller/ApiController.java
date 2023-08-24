package com.assignment.coviddashboardapplication.controller;


import com.assignment.coviddashboardapplication.entity.PatientData;
import com.assignment.coviddashboardapplication.service.CovidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ApiController {
    @Autowired
    private CovidService covidService;
    @CrossOrigin(origins = "http://localhost:3000")

    @GetMapping("/fetch-and-store")
    public String fetchAndStore(@RequestParam(value = "state") String state) {
        return "Data fetched and stored in the database for "+covidService.fetchCovidPatientsList(state).toString();
    }

    @GetMapping("v0.1/fetchByState/{state}")
    public PatientData fetchByState(@PathVariable String state) {
        return covidService.fetchPatientDataByState(state);
    }

    @GetMapping("v0.1/fetchData/allStates")
    public List<PatientData> fetchByState() {
        return covidService.fetchAllStatesData();
    }
}
