import React from "react";
import * as XLSX from "xlsx";
const ExportToExcel = ({ covidata }) => {
  const data = covidata.map((covidcase) => {
    //console.log("data", covidcase);
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
              <th>Recovered</th>
              <th>Death Count</th>
            </tr>
          </thead>
          <tbody class="table-success">
            {data.map((covidstatecase, i) => {
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
