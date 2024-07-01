import { z } from 'zod';

const transcriptCompleteEvent = z.object({
  eventType: z.literal('TRANSCRIPT_COMPLETE'),
  transcriptId: z.string(),
  title: z.string(),
  user: z.string(),
});

const transcriptVerifiedEvent = z.object({
  eventType: z.literal('TRANSCRIPT_VERIFIED'),
  transcriptId: z.string(),
  title: z.string(),
  user: z.string(),
  metadata: z.string().optional(),
});

export const webhookEvent = z.discriminatedUnion('eventType', [
  transcriptCompleteEvent,
  transcriptVerifiedEvent,
]);

export type TranscriptCompleteEvent = z.infer<typeof transcriptCompleteEvent>;

export type TranscriptVerifiedEvent = z.infer<typeof transcriptVerifiedEvent>;

export type WebhookEvent = z.infer<typeof webhookEvent>;
