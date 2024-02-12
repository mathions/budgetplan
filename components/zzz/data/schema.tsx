import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const dataSchema = z.object({
  komponen: z.number(),
  akun: z.string(),
  detil: z.string(),
  rincian: z.number(),
  mata_uang_harga: z.string(),
  harga_satuan: z.number(),
  mata_uang_jumlah: z.string(),
  jumlah: z.number(),
})

export type Data = z.infer<typeof dataSchema>
