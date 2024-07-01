import { builder } from "../builder";

export const configuration = builder({
  extendFn: async (webhookEvent) => {
    /* 
      Extend Function
      Use the extend function to fetch additional data from an API.
    */
    return null;
  },
  storeFn: async (res) => {
    /* 
      Store Function
      Use the store function to format and save the event+data to a store (S3, FileSystem etc..)
      (Note: We recommend that the store has a TTL - Unless you want to store this data indefinitely.)
    */
    console.log('Stored:', res);
  }
});
