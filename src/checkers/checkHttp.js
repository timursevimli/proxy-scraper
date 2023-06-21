'use strict';

const { Agent } = require('node:http');
const { getDuration, getGeoInfo, randomUAgent } = require('../utils/');

const checkHttp = (proxy, cb) => {
  const timeout = 10000;
  const [host, port] = proxy.split(':');
  const url = 'http://google.com';
  const agent = new Agent({
    keepAlive: false,
    // keepAliveMsecs: 1000,
    timeout,
    host,
    port,
  });
  const options = {
    agent,
    timeout,
    method: 'GET',
    headers: {
      'User-agent': randomUAgent(),
      'Content-Type': 'application/json',
    }
  };
  const duration = getDuration();
  fetch(url, options)
    .then(
      (res) => {
        if (res.status === 200) {
          getGeoInfo(proxy).then(
            (res) => {
              res.duration = duration();
              cb(null, res);
            },
            (reason) => cb(reason)
          );
        }
      },
      (reason) => cb(reason)
    )
    .catch((err) => cb(err));
};

module.exports = checkHttp;