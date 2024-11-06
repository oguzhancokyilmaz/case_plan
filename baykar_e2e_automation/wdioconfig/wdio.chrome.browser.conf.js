const { config } = require('./wdio.conf')
require('dotenv').config()
;(
  config.maxInstances = 1,
  config.capabilities = [
  {
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--disable-gpu',
        '--no-sandbox',
        '--window-size=1920,1080',
        '--disable-notifications',
        '--disable-infobars', 
      ],
    },
  },
]),
(exports.config = config)