import React from "react";
import Chart from "react-apexcharts";

const CasePieChart = ({ headerTitle, type, casesLabel }) => {
  const options = {
    colors: ["#f05f05", "#2b54b3", "#999", "#cb9f0c", "#09c4f3"],
    chart: {
      type,
    },
    labels: casesLabel,
    dataLabels: {
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  const series = [30, 40, 45, 50, 49];
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

export default CasePieChart;
