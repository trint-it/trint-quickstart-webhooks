# trint-quickstart-webhook-integration

#### Introduction

- Listen to Trint Webhook Events
- Extend the Event data with an API (In example: The Trint API)
- Store the results in a data store of your choice.

<br />

#### Development

To run the service locally you will need to run `yarn start:dev` and you will need to allow inbound traffic from Trint to reach your service. Once this is setup, you will need to add a url to you Trint developer console. 
https://app.trint.com/account/api

<br />

1. Start the service

```bash
# Runs the project in development mode using nodemon
$ yarn start:dev
```

2. Setup inbound traffic. 

```bash
# Runs the project in development mode using nodemon
$ ngrok http http://localhost:8080
```

3. Add your ngrok url to the [Trint developer console.](https://app.trint.com/account/api)

<br />

#### Unit Tests

```bash
# Run Jest tests
$ yarn test
```

<br />

#### Build Instructions

```bash
# Install packages
$ yarn install

# Build the dist
$ yarn build

# Run the dist
$ yarn start
```
