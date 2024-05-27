"use client";
import { PieChart } from "@mui/x-charts/PieChart";

export default function StatusBelmod({ data } : { data: any }) {
  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground p-6 h-fit space-y-2">
        <div className="text-xl font-semibold">
          Status Penyampaian Usulan
        </div>
        <PieChart
          margin={{ top: 16, bottom: 16 }}
          series={[
            {
              data: [
                { id: 0, value: data?.notSubmitted, label: "Belum diajukan", color: "#21359C" },
                { id: 1, value: data?.submitted, label: "Diajukan", color: "#2A44C6" },
                { id: 2, value: data?.needRevision, label: "Butuh Revisi", color: "#4C63D9" },
                { id: 3, value: data?.revised, label: "Sudah direvisi", color: "#7486E2" },
                { id: 4, value: data?.accepted, label: "Diterima", color: "#9EABEA" },
                { id: 5, value: data?.completed, label: "Selesai", color: "#C8CFF3" },
              ],
            },
          ]}
          width={400}
          height={200}
          slotProps={{ legend: { hidden: true } }}
        />
        <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-4">
          <div className="cols-span-1 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#21359C] rounded-full"></div>
              <div>Belum diajukan</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#2A44C6] rounded-full"></div>
              <div>Diajukan</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#4C63D9] rounded-full"></div>
              <div>Butuh Revisi</div>
            </div>
          </div>
          <div className="cols-span-1 space-y-1">
          <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#7486E2] rounded-full"></div>
              <div>Sudah direvisi</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#9EABEA] rounded-full"></div>
              <div>Diterima</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#C8CFF3] rounded-full"></div>
              <div>Selesai</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
