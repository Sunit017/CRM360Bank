import React from "react";
import Chart from "react-apexcharts";

const CaseBarChart = ({ headerTitle, type, categories }) => {
  const options = {
    colors: ["#f05f05"],
    chart: {
      type,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories,
    },
  };
  const series = [
    {
      name: "Assigned Cases",
      data: [30, 40, 45, 50, 49],
    },
  ];
  return (
    <div style={{ width: "50%", margin: "5px 5px 5px 0px" }}>
      <div
        style={{
          backgroundColor: "#4b53bc",
          color: "#fff",
          fontSize: "small",
          height: "25px",
          paddingLeft: "10px",
        }}
      >
        {headerTitle}
      </div>
      <Chart
        options={options}
        type={type}
        series={series}
        width="500"
        height="200"
      />
    </div>
  );
};

export default CaseBarChart;
