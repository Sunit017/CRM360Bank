import React from "react";
import Chart from "react-apexcharts";

const CaseBarGroupChart = ({ headerTitle, type, casesMonth }) => {
  const series = [
    {
      name: "Raised",
      data: [44, 55, 41, 64, 22],
    },
    {
      name: "Closed",
      data: [53, 32, 33, 52, 13],
    },
    {
      name: "Escalated",
      data: [33, 52, 13, 44, 32],
    },
    {
      name: "Reopen",
      data: [53, 32, 13, 44, 32],
    },
  ];
  const options = {
    colors: ["#2b54b3", "#f05f05", "#999", "#cb9f0c"],
    chart: {
      type: "bar",
      height: 430,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: 0,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: casesMonth,
    },
  };
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
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default CaseBarGroupChart;
