import { builder} from './builder';
import { TranscriptCompleteEvent } from './webhookTypes';

describe("builder", () => {
  it("should output the correct extended data ", async () => {

    const storeFunction = jest.fn();

    const testConfiguration = builder({
      extendFn: async (webhookEvent) => {
        return `Extended data for ${webhookEvent.eventType}`;
      },
      storeFn: storeFunction,
    });

    const mockWebhookEvent: TranscriptCompleteEvent = {
      eventType: 'TRANSCRIPT_COMPLETE',
      transcriptId: 'file-id',
      title: 'file-title',
      user: 'user-id',
    };

    await testConfiguration.submitEvent(mockWebhookEvent);

    expect(storeFunction).toHaveBeenCalledWith({
      webhookEvent: mockWebhookEvent,
      data: `Extended data for ${mockWebhookEvent.eventType}`,
    });
  });
});
