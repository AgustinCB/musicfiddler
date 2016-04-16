# Programmers API

API service to look for best programmers to hire based on their contributions in github in field related projects

### Prerequisites

- nodejs
- mongoDB
- babel

### Building the project

`npm run build`

### Running the service

`node lib/server.js`

### Configuration 

Configuration is stored in config.json file, in the format of a json object with the following keys:

- port: Port in which run the app
- mongodb: Location of the mongoDB service.
- access_token: github token to make the calls

### Usage

* POST /api/request

Creates a new request. It accepts the following parameters:

- langs: A list with the programming languages to look for.
- keys: A list with the keywords of to look for.

It returns an id to check the status of the request.

* GET /api/request/:id

Gets the current status of a request.

* GET /api/result/:id

Gets the results of a search requested.

### Tests

Tests run under mocha.

`./node_modules/mocha/bin/mocha lib/tests/index.js`
