import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { configuration } from './configuration/enpsConfiguration';
import { webhookEvent } from './webhookTypes';

function start() {
  dotenv.config();

  const app = express();
  app.use(json());
  app.use(cors());
  
  app.get('/', (_req, res) => {
    console.log('/');
    res.sendStatus(200);
  });

  app.post('/webhook', async (req, res) => {
    try {
      const webhookEventData = webhookEvent.parse(req.body);
      console.log('/webhook', { webhookEventData });
      await configuration.submitEvent(webhookEventData);
  
      res.sendStatus(200);
    } catch(err) {
      console.log('Error /webhook', err);
      res.sendStatus(400);
    }
  });
  
  const port = process.env.PORT || 8080;
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

start();
