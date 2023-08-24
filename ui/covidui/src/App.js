import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "./App.css";

import data from "./data";
import ChartGraph from "./ChartGraph";
import ExportToExcel from "./ExportToExcel";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  const [covidata, setcoviData] = useState([]);
  // console.log(covidata);
  //-------------------------------
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://localhost:8090/v0.1/fetchData/allStates"
  //     );
  //     // console.log("here is the response", response.data);
  //     setcoviData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  //----------------------------------------------------------
  useEffect(() => {
    axios
      .get("http://localhost:8090/v0.1/fetchData/allStates")
      .then((response) => {
        const resp = response.data;
        setcoviData(resp);
        console.log("response from restapi", resp);
      })
      .catch((error) => {
        console.log("Error", error.message);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }, []);
  //-----------------------------------------------------------------
  return (
    <>
      <div class="container-fluid p-5 bg-primary text-white text-center">
        <h1>COVID DASHBOARD</h1>
      </div>
      <div class="container mt-5">
        <>
          <ExportToExcel covidata={covidata} />
          <br />
        </>
      </div>
      <div class="container mt-5">
        <h1>Bar Graph</h1>
        <ChartGraph />
      </div>
    </>
  );
};

export default App;
