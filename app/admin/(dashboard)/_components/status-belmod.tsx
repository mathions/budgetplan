"use client";
import { PieChart } from "@mui/x-charts/PieChart";
import * as React from "react";

export default function StatusBelmod() {
  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground p-6 h-[320px]">
        <div className="text-xl font-semibold">
          Status Penyampaian Usulan
        </div>
        <PieChart
          margin={{ top: 16, bottom: 16 }}
          series={[
            {
              data: [
                { id: 0, value: 10, label: "Belum diajukan", color: "#4C63D9" },
                { id: 1, value: 20, label: "Diterima", color: "#D2D8F5" },
                { id: 2, value: 5, label: "Ditolak", color: "#A5B1EB" },
                { id: 3, value: 15, label: "Diajukan", color: "#798BE3" },
              ],
            },
          ]}
          width={400}
          height={200}
          slotProps={{ legend: { hidden: true } }}
        />
        <div className="grid grid-cols-2">
          <div className="cols-span-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <div>Belum diajukan</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/75 rounded-full"></div>
              <div>Diajukan</div>
            </div>
          </div>
          <div className="cols-span-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/50 rounded-full"></div>
              <div>Ditolak</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/25 rounded-full"></div>
              <div>Diterima</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
