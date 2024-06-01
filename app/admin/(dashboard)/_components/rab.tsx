"use client"

import { useState } from "react";
import { RabDashboard } from "@/lib/definitions";
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"

export default function Rab({ data } : { data: RabDashboard[] }) {
  const [rabData, setRabData] = useState<RabDashboard[]>(data || []);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Semua");
  const selectedData = data ? data.find(item => item.area === value) : { area: 'Semua', total: 0, kendaraan: 0, perangkat: 0, peralatan: 0, pembangunan: 0 };

  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground p-6 space-y-6">
        <div className="flex justify-between">
        <div className=" text-xl font-semibold">Rencana Anggaran Biaya</div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? rabData.find((rab) => rab.area === value)?.area
                  : "Pilih wilayah"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Pilih wilayah..." />
                <CommandEmpty>Wilayah tidak ditemukan.</CommandEmpty>
                <CommandGroup>
                  {rabData.map((rab) => (
                    <CommandItem
                      key={rab.area}
                      value={rab.area}
                      onSelect={() => {
                        setValue(rab.area)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === rab.area ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {rab.area}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

        </div>
        {selectedData && (
        <div className="space-y-4">
          <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
            <div className="text-textweak">
              Layanan Sarana dan Prasarana Internal
            </div>
            <h3>Rp {selectedData.total.toLocaleString("id-ID")}</h3>
          </div>
          <div className="md:grid grid-cols-2 gap-4">
            <div className="col-span-1 space-y-4">
              <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
                <div className="text-textweak">Kendaraan Bermotor</div>
                <h5>Rp {selectedData.kendaraan.toLocaleString("id-ID")}</h5>
              </div>
              <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
                <div className="text-textweak">Perangkat Pengolah Data dan Komunikasi</div>
                <h5>Rp {selectedData.perangkat.toLocaleString("id-ID")}</h5>
              </div>
            </div>
            <div className="col-span-1 space-y-4">
              <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
                <div className="text-textweak">Peralatan Fasilitas Perkantoran</div>
                <h5>Rp {selectedData.peralatan.toLocaleString("id-ID")}</h5>
              </div>
              <div className="border border-strokeweak rounded-xl px-4 py-5 space-y-2">
                <div className="text-textweak">Pembangunan Gedung dan Bangunan</div>
                <h5>Rp {selectedData.pembangunan.toLocaleString("id-ID")}</h5>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </>
  );
}
