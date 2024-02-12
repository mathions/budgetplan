import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const dataSchema = z.object({
  // id: z.string(),
  // tahun_anggaran: z.string(),
  // satuan_kerja: z.string(),
  // status: z.string(),

  no_urut: z.number(),
  office: z.string(),
  year: z.number(),
  slug: z.string(),
  status: z.string(),
})

export type Data = z.infer<typeof dataSchema>
