'use strict';

const { getSource } = require('./utils/');
const { logger } = require('./lib');
const checkers = require('./checkers/');
const scraper = require('./scraper.js');
const checker = require('./checker.js');

const seqCheck = async (proxies, tasks, logger, options) => {
  for (const task of tasks) {
    await checker(proxies, task, logger, options);
  }
};

const parCheck = (proxies, tasks, logger, options) =>
  new Promise((resolve) => {
    const promises = tasks.map((task) =>
      checker(proxies, task, logger, options),
    );
    Promise.all(promises).finally(resolve);
  });

const finalize = async () => {
  logger.show('system', 'All done!');
  await logger.close();
  process.exit(0);
};

const executorOptions = {
  multi: {
    executor: parCheck,
    getChannel: (ch, count) => (ch / count).toFixed(0),
  },
  single: {
    executor: seqCheck,
    getChannel: (ch) => ch,
  },
};

const executionException = () => {
  const msg = "Wrong mode, use 'single' or 'multi' mode in config.json!";
  throw new Error(msg);
};

const boot = async (options) => {
  const { mode, timeout, source, channel } = options;
  const proxySources = await getSource(source);
  const proxies = await scraper(proxySources);
  const executorOption = executorOptions[mode];
  if (!executorOption) executionException();
  const { executor, getChannel } = executorOption;
  const tasks = Object.values(checkers);
  const channels = getChannel(channel, tasks.length);
  await executor(proxies, tasks, { timeout, channels });
  finalize();
};

process.on('uncaughtExceptionMonitor', (err) => {
  logger.show('error', err.message || err);
});

process.on('uncaughtException', (err) => {
  logger.error(err);
  setTimeout(async () => {
    await logger.close();
    process.exit(1);
  }, 0);
});

process.on('SIGINT', async () => {
  logger.show('system', 'EXITING...');
  await logger.close();
  process.exit(0);
});

module.exports = boot;
