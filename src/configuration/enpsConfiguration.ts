import * as fs from 'fs';
import * as path from 'path';
import { XMLBuilder } from 'fast-xml-parser';
import { builder } from '../builder';
import { trintApi } from '../trintApi';

export const configuration = builder({
  extendFn: async (webhookEvent) => {
    /* 
      Extend Function
      Use the extend function to fetch additional data from an API.

      (In this example: Get the transcript text from the Trint API.)
    */

    const { eventType, transcriptId } = webhookEvent;

    switch (webhookEvent.eventType) {
      case 'TRANSCRIPT_COMPLETE':
      case 'TRANSCRIPT_VERIFIED':
      case 'TRANSCRIPT_NEW_VERSION':
        const text = await trintApi.fetchTranscriptText(
          transcriptId,
        )
        return text;
      default:
        console.log('Unknown event type', { eventType });
        return null;
    }
  },
  storeFn: async (outputData) => {
    /* 
      Store Function
      Use the store function to format and save the event+data to a store (S3, FileSystem etc..)
      (Note: We recommend that the store has a TTL - Unless you want to store this data indefinitely.)

      (In this example: Write the output XML data to an output directory.)
    */

   // Convert the object to a XML string for ENPS
    const builder = new XMLBuilder({ format: true });
    const xmlString = builder.build(outputData) as string;

    // Define the output directory and ensure it exists
    const outputDirectory = path.join(__dirname, '..', 'output');
    const outputDirectoryExists = fs.existsSync(outputDirectory);
    if (!outputDirectoryExists) fs.mkdirSync(outputDirectory, { recursive: true });

    // Generate a unique filename using a timestamp
    const uniqueFileName = `${Date.now()}.xml`;

    // Generate the file path
    const filePath = path.join(outputDirectory, uniqueFileName);

    // Write the file
    fs.writeFile(filePath, xmlString, 'utf8', (error) => {
      if (error) {
        /* 
          How would you like to handle errors?
          (You may want to implement retry logic)
        */
        console.log('Error', { error });
      } else {
        console.log('Success', { filePath });
      }
    });
  },
});
