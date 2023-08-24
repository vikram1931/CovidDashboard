import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

function App() {
  const [chartData, setChartData] = useState({});

  const fetchData = async () => {
    try {
      const states = ["ca", "tx", "ny"]; // Add more states as required
      const positiveCases = [];
      const recoveredCases = [];
      const deathCases = [];

      for (let state of states) {
        const response = await axios.get(
          `https://api.covidtracking.com/v1/states/${state}/current.json`
        );
        positiveCases.push(response.data.positive);
        recoveredCases.push(response.data.recovered);
        deathCases.push(response.data.death);
      }

      setChartData({
        labels: states,
        datasets: [
          {
            label: "Positive",
            data: positiveCases,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
          {
            label: "Recovered",
            data: recoveredCases,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "Deaths",
            data: deathCases,
            backgroundColor: "rgba(255, 206, 86, 0.6)",
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
}

export default App;
