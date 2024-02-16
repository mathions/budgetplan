import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const dataSchema = z.object({
  no_urut: z.number(),
  uuid: z.string(),
  created_at: z.string(),
  office: z.string(),
  year: z.string(),
  status: z.string(),
})

export type Data = z.infer<typeof dataSchema>
