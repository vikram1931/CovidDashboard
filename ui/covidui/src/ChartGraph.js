import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, registerables } from "chart.js";

import axios from "axios";
const ChartGraph = () => {
  Chart.register(CategoryScale);
  Chart.register(LinearScale);
  Chart.register(...registerables);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Positive",
        data: [],
        backgroundColor: "rgba(60,179,113)",
      },
      {
        label: "Recovered",
        data: [],
        backgroundColor: "rgba(0,0,255)",
      },
      {
        label: "Deaths",
        data: [],
        backgroundColor: "rgba(255, 165,0)",
      },
    ],
  });
  const fetchData = async () => {
    try {
      const states = [
        "az",
        "ca",
        "fl",
        "ga",
        "il",
        "ma",
        "or",
        "pa",
        "tx",
        "wa",
      ]; // Add more states as required
      const positiveCases = [];
      const recoveredCases = [];
      const deathCases = [];

      for (let state of states) {
        const response = await axios.get(
          `http://localhost:8090/v0.1/fetchByState/${state}`
        );
        // console.log(response.data);
        // http://localhost:8090/v0.1/fetchByState/ny
        //https://api.covidtracking.com/v1/states/${state}/current.json
        positiveCases.push(
          response.data.positive === null ? 0 : response.data.positive
        );
        recoveredCases.push(
          response.data.recovered === null ? 0 : response.data.recovered
        );
        deathCases.push(response.data.death === null ? 0 : response.data.death);
      }

      setChartData({
        labels: states,
        datasets: [
          {
            label: "Positive",
            data: positiveCases,
            backgroundColor: "rgba(60,179,113)",
          },
          {
            label: "Recovered",
            data: recoveredCases,
            backgroundColor: "rgba(0,0,255)",
          },
          {
            label: "Deaths",
            data: deathCases,
            backgroundColor: "rgba(255, 165,0)",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Bar
        data={chartData}
        options={{
          title: {
            display: true,
            text: "Distribution of COVID-19 cases in selected states",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "top",
          },
        }}
      />
    </div>
  );
};

export default ChartGraph;
