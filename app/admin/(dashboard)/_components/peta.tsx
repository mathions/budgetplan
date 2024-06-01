"use client"

import { Chart } from "react-google-charts";

export const options = {
  colorAxis: { colors: ["#A5B1EB","#4C63D9"] },
  tooltip: {isHtml: true, showTitle: false},
};

export default function Peta({ data } : { data: any }) {
  const defaultData = [
    ["Country", "Anggaran", { role: "tooltip", type: "string", 'p': {'html': true} }],
    ["Indonesia", 0, ""],
  ];
  
  const chartData = data || defaultData;

  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground p-6">
        <div className="text-xl font-semibold">Peta Satuan Kerja</div>
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                const region = chartData[selection[0].row + 1];
                console.log("Selected : " + region);
              },
            },
          ]}
          chartType="GeoChart"
          width="100%"
          height="400px"
          data={chartData}
          options={options}
        />
      </div>
    </>
  );
}
