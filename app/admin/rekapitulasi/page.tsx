import { ChevronRightIcon } from "@radix-ui/react-icons";
import { FormRekap } from "./form-rekap";


export default function Rekapitulasi () {
  return (
    <>
      <div className="flex items-center space-x-2 mb-4">
        <div className="text-foreground/70 text-[14px]">Dashboard</div>
        <div className="text-foreground/70 "><ChevronRightIcon/></div>
        <div className="text-[14px]">Rekapitulasi</div>
      </div>
      <h2 className="text-3xl font-bold tracking-tight">Rekapitulasi</h2>
      <div className="my-6">
        <FormRekap />
      </div>
    </>
  )
}