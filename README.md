![cf](https://i.imgur.com/7v5ASc8.png) Lab 07: Vanilla HTTP Server
======

[![Build Status](https://travis-ci.com/hjmendoza/07-http-server.svg?branch=master)](https://travis-ci.com/hjmendoza/07-http-server)

TRAVIS: https://travis-ci.com/hjmendoza/07-http-server
PR: https://github.com/hjmendoza/07-http-server/pull/1

## Feature Tasks  
Built an HTTP server with a  main *server module* and separate module to parse a request's url and body. 

The application uses the [Cowsay](https://www.npmjs.com/package/cowsay) module.

The server module is responsible for creating an http server defining all route behavior and exporting an interface for starting and stoping the server. It exports an object with `start` and `stop` methods. The start and stop methods each return a promise that resolves on success and rejects on error. 

###### GET /
When a client makes a GET request to / the server sends back html with a project description and anchor to /cowsay.

###### GET /cowsay?text={message}
When a client makes a GET request to /cowsay?text={message} the server parses the querystring for a text key. It then sends a rendered HTML page with a cowsay cow speaking the value of the text query. If there is no text query the cow message says `'I need something good to say!'`. 

###### GET /api/cowsay?text={message}
When a client makes a POST request to /api/cowsay it sends JSON that includes `{"text": "<message>"}`. The server responds with a JSON body `{"content": "<cowsay cow>"}`.  

A response for a invalid requests sends status code of 400 and appropriate JSON body.

###### POST /api/cowsay 
When a client makes a POST request to /api/cowsay it sends JSON that includes `{"text": "<message>"}`. The server responds with a JSON body `{"content": "<cowsay cow>"}`.

## To Start Application
Clone down code
Install node dependencies using `npm i`
Create a .env in the root directory with a PORT
To run, run `npm start`. To run tests, run `npm test`
View application application at `http://localhost:<PORT>`

