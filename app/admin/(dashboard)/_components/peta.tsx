"use client"

import { Chart } from "react-google-charts";

export const data = [
  ["Country", "Anggaran", { role: "tooltip", type: "string", 'p': {'html': true} }],
  ["Germany", 2000, "<b>KBRI Berlin</b><br>Anggaran:<br>Rp 2.000 jt"],
  ["United States", 2800, "<b>KBRI New York</b><br>Anggaran:<br>Rp 2.800 jt"],
  ["Brazil", 1600, "<b>KBRI Brasilia</b><br>Anggaran:<br>Rp 1.600 jt"],
  ["Canada", 1400, "<b>KBBRI Canberra</b><br>Anggaran:<br>Rp 1.400 jt"],
  ["France", 2100, "<b>KBRI Paris</b><br>Anggaran:<br>Rp 2.100 jt"],
  ["RU", 2300, "<b>KBRI Moscow</b><br>Anggaran:<br>Rp 2.300 jt"],
  ["Iran", 2300, "<b>KBRI Iran</b><br>Anggaran:<br>Rp 2.300 jt"],
];

export const options = {
  colorAxis: { colors: ["#A5B1EB","#4C63D9"] },
  tooltip: {isHtml: true, showTitle: false},
};

export default function Peta() {
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
                const region = data[selection[0].row + 1];
                console.log("Selected : " + region);
              },
            },
          ]}
          chartType="GeoChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    </>
  );
}
