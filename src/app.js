'use strict';

const http = require('http');
const cowsay = require('cowsay');
const parser = require('./lib/parser');

const requestHandler = (req, res) => {

  parser(req)
    .then(req => {

      if (req.method === 'GET' && req.url.pathname === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';

        let markup = `<!DOCTYPE 
        /html>
        <html>
          <head>
            <title> cowsay </title>  
          </head>
          <body>
           <header>
             <nav>
               <ul> 
                 <li><a href="/cowsay">cowsay</a></li>
               </ul>
             </nav>
           <header>
           <main>
             <h1>Lab 7 - Cowsay</h1>
           </main>
          </body>
        </html>`;

        res.write(markup);
        res.end();
        return;

      } else if (req.method === 'GET' && req.url.pathname === 'cowsay') {

        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        let sendResponse = cowsay.say(null);
        sendResponse;
        let queryStr = req.url.query;

        if (!queryStr.text) {
          sendResponse = cowsay.say({
            text: 'I need something good to say!',
          });
        } else {
          sendResponse = cowsay.say({
            text: req.url.query.text,
          });
        }
        let markup = `<!DOCTYPE html>
        <html>
          <head>
            <title> cowsay </title>  
          </head>
          <body>
            <h1> cowsay </h1>
            <pre>
              <h2>${cowsay.say({text: req.query.text})}</h2>
            </pre>
          </body>
        </html>`;

        res.write(markup);
        res.end();
        return;
      }
      

      else if ( req.method === 'POST' && req.url.pathname === '/api/cowsay' ) {
        res.setHeader('Content-Type', 'text/json');
        res.statusCode = 200;
        res.statusMessage = 'OK';
        if(!req.body.text){
          res.statusCode = 400;
          res.statusMessage = 'invalid request';
          res.write(JSON.stringify({error : 'invalid request: text query required'}));
        }
        else{
          res.write(JSON.stringify({content : cowsay.say({text:req.body.text})}));
        }
        res.end();
        return;
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.write('Resource Not Found');
        res.end();
      }
    })
    .catch(res => {
      res.writeHead(400);
      res.write(JSON.stringify({
        error: 'invalid request: body required',
      }));
      res.end();
    });
};

// Server callback
const app = http.createServer(requestHandler);

// Expose the start and stop methods.  index.js will call on these.
module.exports = {
  start: (port, callback) => app.listen(port, callback),
  stop: (callback) => app.close(callback),
};