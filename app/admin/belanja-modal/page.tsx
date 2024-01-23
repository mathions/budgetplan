import { promises as fs } from "fs"
import path from "path"
import { dataSchema } from "./data/schema"
import { z } from "zod"

import { columns } from "./components/column"
import { DataTable } from "./components/data-table"


async function getData() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/admin/belanja-modal/data/data.json")
  )
  const tasks = JSON.parse(data.toString())
  return z.array(dataSchema).parse(tasks)
}

export default async function BelanjaModal() {
  const data = await getData()

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Belanja Modal</h2>
      <div className="py-6">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
