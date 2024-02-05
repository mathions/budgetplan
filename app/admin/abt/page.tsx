import { promises as fs } from "fs"
import path from "path"
import { dataSchema } from "./data/schema"
import { z } from "zod"

import { columns } from "./components/column"
import { DataTable } from "./components/data-table"
import { ChevronRightIcon } from "@radix-ui/react-icons"


async function getData() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/admin/abt/data/data.json")
  )
  const tasks = JSON.parse(data.toString())
  return z.array(dataSchema).parse(tasks)
}

export default async function Abt() {
  const data = await getData()

  return (
    <>
      <div className="flex items-center space-x-2 mb-4">
        <div className="text-foreground/70 text-[14px]">Dashboard</div>
        <div className="text-foreground/70 "><ChevronRightIcon/></div>
        <div className="text-[14px]">ABT</div>
      </div>
      <h2 className="text-3xl font-bold tracking-tight">ABT</h2>
      <div className="py-6">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
