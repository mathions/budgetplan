import { promises as fs } from "fs"
import path from "path"
import { dataSchema } from "./data/schema"
import { z } from "zod"

import { columns } from "./components/column"
import { DataTable } from "./components/data-table"
import Breadcrumbs from "@/components/breadcrumbs"

async function getData() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/admin/abt/data/data.json")
  )
  const tasks = JSON.parse(data.toString())
  return z.array(dataSchema).parse(tasks)
}

export default async function Abt () {
  const data = await getData()

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Beranda', href: '/beranda' },
          { label: 'ABT', href: '/abt', active: true },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">ABT</h2>

      <div className="my-6">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}