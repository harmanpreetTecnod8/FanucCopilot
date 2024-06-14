import { z } from 'zod'

export const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  isUserMessage: z.boolean(),
  activeModule: z.string(),
})

// array validator
export const MessageArraySchema = z.array(MessageSchema)

export type Message = z.infer<typeof MessageSchema>
