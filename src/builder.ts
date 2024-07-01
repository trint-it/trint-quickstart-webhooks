import { WebhookEvent } from "./webhookTypes";

interface Args<T> {
  extendFn: (webhookEvent: WebhookEvent) => Promise<T>;
  storeFn: (res: { webhookEvent: WebhookEvent; data: T }) => Promise<void>;
}

export function builder<T>(args: Args<T>) {
  return {
    submitEvent: async (webhookEvent: WebhookEvent) => {
      const { extendFn, storeFn } = args;
  
      const data = await extendFn(webhookEvent);

      storeFn({
        webhookEvent,
        data,
      });
    },
  };
}
