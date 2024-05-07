"use client";
import { PieChart } from "@mui/x-charts/PieChart";
import * as React from "react";

export default function StatusBelmod() {
  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground p-6 h-[320px]">
        <div className="font-semibold">Status Pengajuan Belanja Modal</div>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </>
  );
}
