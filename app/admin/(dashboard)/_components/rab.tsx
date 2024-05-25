"use client"

import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger,SelectValue,
} from "@/components/ui/select"

const data = [
  {
    area: 'Asia',
    total: '13000000000',
    kendaraan: '2700000000',
    perkantoran: '1200000000',
    komunikasi: '600000000',
    bangunan: '8500000000'
  },
  {
    area: 'Eropa',
    total: '32000000000',
    kendaraan: '2100000000',
    perkantoran: '6200000000',
    komunikasi: '200000000',
    bangunan: '4500000000'
  },
  {
    area: 'Afrika',
    total: '32000000000',
    kendaraan: '2100000000',
    perkantoran: '6200000000',
    komunikasi: '200000000',
    bangunan: '4500000000'
  }
]

export default function Rab() {
  const [selectedArea, setSelectedArea] = useState('Asia');

  const selectedData = data.find(item => item.area === selectedArea);

  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground p-6 space-y-6">
        <div className="flex justify-between">
        <div className=" text-xl font-semibold">Rencana Anggaran Biaya</div>
            <Select onValueChange={setSelectedArea} >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih wilayah" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Wilayah</SelectLabel>
              <SelectItem value="Asia">Asia</SelectItem>
              <SelectItem value="Eropa">Eropa</SelectItem>
              <SelectItem value="Afrika">Afrika</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
        {selectedData && (
        <div className="space-y-4">
          <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
            <div className="text-textweak">
              Layanan Sarana dan Prasarana Internal
            </div>
            <h3>{selectedData.total}</h3>
          </div>
          <div className="md:grid grid-cols-2 gap-4">
            <div className="col-span-1 space-y-4">
              <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
                <div className="text-textweak">Kendaraan Bermotor</div>
                <h5>{selectedData.kendaraan}</h5>
              </div>
              <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
                <div className="text-textweak">Perangkat Pengolah Data dan Komunikasi</div>
                <h5>{selectedData.komunikasi}</h5>
              </div>
            </div>
            <div className="col-span-1 space-y-4">
              <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
                <div className="text-textweak">Peralatan Fasilitas Perkantoran</div>
                <h5>{selectedData.perkantoran}</h5>
              </div>
              <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
                <div className="text-textweak">Pembangunan Gedung dan Bangunan</div>
                <h5>{selectedData.bangunan}</h5>
              </div>
            </div>
          </div>
        </div>
        )}
        {selectedArea}
      </div>
    </>
  );
}
