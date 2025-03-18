import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ headerTitle, type, casesLabel, data }) => {
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
        breakpoint: 1000,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  const series = data;
  return (
    <div
      style={{
        width: "50%",
        margin: "5px 5px 5px 0px",
      }}
    >
      <div
        style={{
          backgroundColor: "#092f85",
          color: "#fff",
          fontSize: "small",
          height: "25px",
          paddingLeft: "10px",
          paddingTop: "5px",
          width: "100%",
        }}
      >
        {headerTitle}
      </div>
      <div>
        <Chart
          options={options}
          type={type}
          series={series}
          width="390"
          height="200"
        />
      </div>
    </div>
  );
};

export default PieChart;
