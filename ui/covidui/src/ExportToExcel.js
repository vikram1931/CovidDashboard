import React from "react";
import * as XLSX from "xlsx";
const ExportToExcel = ({ covidata }) => {
  //console.log("covidata", covidata);
  const data = covidata.map((covidcase) => {
    return covidcase;
  });
  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "export.xlsx");
  };

  return (
    <>
      <div>
        <button
          type="button"
          class="btn btn-secondary float-end"
          onClick={handleExportToExcel}
        >
          Export
        </button>
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th>State</th>
              <th>Positive Cases Count</th>
              <th>Negative Cases Count</th>
              <th>Currently Hospitalized</th>
              <th>In ICU Currently</th>
              <th>Recovered</th>
              <th>Death Count</th>
            </tr>
          </thead>
          <tbody class="table-success">
            {data.map((covidstatecase, i) => {
              //----------------------------------------
              //export to excel

              //-------------------------------------

              return (
                <tr key={i}>
                  <td>{covidstatecase.state}</td>
                  <td>
                    {covidstatecase.positive === null
                      ? 0
                      : covidstatecase.positive}
                  </td>
                  <td>
                    {covidstatecase.negative === null
                      ? 0
                      : covidstatecase.negative}
                  </td>
                  <td>
                    {covidstatecase.hospitalizedCurrently === null
                      ? 0
                      : covidstatecase.hospitalizedCurrently}
                  </td>
                  <td>
                    {covidstatecase.icuCurrently === null
                      ? 0
                      : covidstatecase.icuCurrently}
                  </td>
                  <td>
                    {covidstatecase.recovered === null
                      ? 0
                      : covidstatecase.recovered}
                  </td>
                  <td>
                    {covidstatecase.death === null ? 0 : covidstatecase.death}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExportToExcel;
