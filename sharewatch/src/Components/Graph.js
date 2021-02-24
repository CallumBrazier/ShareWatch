import React from "react";

import { Line } from "react-chartjs-2";

const LineGraph = ({ stockHistory, graphData }) => {
  return (
    <div>
      <Line
        data={{
          labels: graphData,
          datasets: [
            {
              label: "Daily stock",
              data: stockHistory,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 0.5)"],
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={400}
        options={{
          maintainAspectRatio: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  // beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default LineGraph;
