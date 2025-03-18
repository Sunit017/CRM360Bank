import React from "react";
import Chart from "react-apexcharts";

const BarGroupChart = ({ headerTitle, type, casesCategories }) => {
  const series = [
    {
      name: "Open",
      data: [4, 5, 4, 6],
    },
    {
      name: "Completed",
      data: [5, 3, 3, 8],
    },
    {
      name: "Rejected",
      data: [3, 2, 3, 5],
    },
  ];
  const options = {
    colors: ["#EE82EE", "#00FF7F", "#00BFFF"],
    chart: {
      type: "bar",
      height: 430,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: false,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    grid: {
      show: true,
      borderColor: "#90A4AE",
      strokeDashArray: 0.5,
      position: "back",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      row: {
        opacity: 0.3,
      },
      column: {
        opacity: 0.3,
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
      categories: casesCategories,
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: 400,
          },
        },
      },
    ],
  };
  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#4b53bc",
          color: "#fff",
          fontSize: "small",
          height: "25px",
          paddingLeft: "10px",
          paddingTop: "5px",
          textAlign: "center",
        }}
      >
        {headerTitle}
      </div>
      <Chart
        options={options}
        type={type}
        series={series}
        width="600"
        height="300"
      />
    </div>
  );
};

export default BarGroupChart;
