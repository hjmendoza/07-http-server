'use strict';

const superagent = require('superagent');
const app = require('../src/app.js');

describe('Simple Web Server', () => {

  beforeAll(() => {
    app.start(3000);
  });

  afterAll(() => {
    app.stop();
  });

  it('handles an invalid get request with a 404', () => {

    return superagent.get('http://localhost:3000/foo')
      .then(true)
      .catch(response => expect(response.status).toEqual(404));

  });

  it('handles a valid get request', () => {

    return superagent.get('http://localhost:3000/')
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual(expect.stringContaining('h1'));
        expect(response.text).toEqual(expect.stringContaining('cowsay'));
      })
      .catch(console.err);
  });

  it('handles a good post request', () => {
    let obj = {text:'Cowz'};
    let cowsay = require('cowsay');
    let expected = JSON.stringify({content :cowsay.say(obj)});
    return superagent.post('http://localhost:3000/api/cowsay')
      .send(obj)
      .then(response => {
        expect(response.text).toEqual(expected);
      });
  });

  it('handles a bad post request with no text query string', () => {
    let obj = {nottext:'NotMooz'};
    return superagent.post('http://localhost:3000/api/cowsay')
      .send(obj)
      .catch(response=> {
        expect(response.status).toEqual(401);
      });
  });
  it('handles a bad post request with empty body', () => {
    let obj = {};
    return superagent.post('http://localhost:3000/api/cowsay')
      .send(obj)
      .catch(response=> {
        expect(response.status).toEqual(401);
      });
  });
  it('handles 404 error for invalid routes', () => {
    let obj = {};
    return superagent.post('http://localhost:3000/badrequest')
      .send(obj)
      .catch(response=> {
        expect(response.status).toEqual(404);
      });
  });
});