import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const dataSchema = z.object({
  no_urut: z.string(),
  status: z.string(),
  uuid: z.string(),
  office: z.string(),
  perihal: z.string(),
  created_at: z.string(),
})

export type Data = z.infer<typeof dataSchema>
