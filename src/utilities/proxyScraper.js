'use strict';
const axios = require('axios');
const pLimit = require('p-limit');
const SCRAPER_REQ_OPTIONS = require('../options/scraperRequestParam.js');
const { yellow, green, red } = require('../helpers/Colorer.js');
const { saveErrorsToLog } = require('../helpers/logSaver.js');

const scraperLogger = (count) => {
  const stats = { saved: 0, unsaved: count };
  return (index) => {
    const progress = ((index / count) * 100).toFixed(1);
    const end = '\r';
    process.stdout.write(
      yellow('[SCRAPER WORKING]') +
      ' Scraped count: ' + count +
      yellow('|') +
      'Saved: ' + (++stats.saved) +
      yellow('|') +
      'Unsaved: ' +  (--stats.unsaved) +
      yellow('|') +
      'Progress: ' +  (count === index + 1 ? 100 : progress) + '%' + end
    );
    if (count === index + 1) {
      return console.log(
        green('[SCRAPER COMPLETED]') +
        ' Scraped count: ' + green(count) +
        yellow('|') +
        'Saved: ' + green(stats.saved) +
        yellow('|') +
        'Unsaved: ' + red(stats.unsaved) +
        yellow('|') +
        'Progress: ' +  green('100%')
      );
    }
  };
};

const proxySaver = async (proxyRepository, proxies) => {
  const count = proxies.length;
  const logger = scraperLogger(count);
  for (const [i, proxy] of proxies.entries()) {
    const [ip, port] = proxy.split(':');
    await proxyRepository.insertScrapedProxy(ip, port);
    logger(i);
  }
};

const proxyParser = async (proxyRepository, datas) => {
  const parsedData = datas.split(/\s+/);
  const ipPortPattern = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5})/;
  const parsedProxies = [];
  for (const data of parsedData) {
    const result = ipPortPattern.exec(data);
    if (!result) continue;
    const proxy = result[0];
    parsedProxies.push(proxy);
  }
  return await proxySaver(proxyRepository, parsedProxies);
};

const proxyScraper = async (proxyRepository, urls) => {
  const uniqueUrls = new Set(urls);
  const threat = parseInt(process.env.SCRAPER_THREAT);
  const queue = pLimit(threat);
  const promises = [];
  const datas = [];
  const errors = {};
  for (const url of uniqueUrls) {
    promises.push(queue(() =>
      axios.get(url, { timeout: 10000, ...SCRAPER_REQ_OPTIONS })
        .then((res) => datas.push(res.data))
        .catch((err) => errors[url] = err.message)
    ));
  }
  await Promise.all(promises);
  saveErrorsToLog(errors);
  const datasToString = datas.toString();
  return await proxyParser(proxyRepository, datasToString);
};

module.exports = proxyScraper;
